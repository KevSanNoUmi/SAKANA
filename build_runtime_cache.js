#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;
const readJSON = (name, fallback=null) => {
  const p=path.join(ROOT,name);
  if(!fs.existsSync(p)) return fallback;
  return JSON.parse(fs.readFileSync(p,'utf8'));
};
const writeJSON = (name, obj) => fs.writeFileSync(path.join(ROOT,name), JSON.stringify(obj));

const DATA = readJSON('data.json');
const TIDES = readJSON('tides_2026.json');
const SYNTH = readJSON('synthesis.json',{});
const LURETYPO = readJSON('lure_typology.json',{});
if(!DATA || !TIDES) throw new Error('data.json et tides_2026.json sont requis.');

// Noyau de démarrage : aucune observation lourde, seulement les éléments visibles à l'accueil.
const counts={};
for(const sp of DATA.species||[]) counts[String(sp.id)]=(DATA.observations||[]).filter(o=>o.species_id===sp.id).length;
const stops=(DATA.trip_stops||[]).map(s=>{
  const intel=(s.intel||[]).filter(x=>['strategy','access','field'].includes(x.category));
  const score=x=>(Number(x.confidence_level)||0)*10+(x.category==='strategy'?3:x.category==='access'?2:1);
  return {...s,intel_count:(s.intel||[]).length,intel:[...intel].sort((a,b)=>score(b)-score(a)).slice(0,5)};
});
const core={
  schema_version:DATA.schema_version,updated:DATA.updated,gear_policy:DATA.gear_policy||{},evidence_policy:DATA.evidence_policy||{},
  species:DATA.species||[],observations:[],inferences:[],lures:DATA.lures||[],combos:DATA.combos||[],trip_stops:stops,
  observation_counts:counts,observation_total:(DATA.observations||[]).length,inference_total:(DATA.inferences||[]).length,
  synth_home:{transversals:SYNTH.transversals||null,based_on:SYNTH.based_on||''}
};
writeJSON('app_core.json',core);

// Le moteur de décision est exécuté une fois au build avec le même JavaScript que la PWA.
// Cela évite toute divergence entre une réimplémentation Python et le front.
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
let js=html.split('<script>')[1].split('</script>')[0];
js=js.split("if('serviceWorker' in navigator){")[0];
const append=`
DATA=__DATA; SYNTH=__SYNTH; LURETYPO=__LURETYPO; TIDES=__TIDES; hydrateTypologies(); resetPerfCaches();
const __bm=bestMomentsBySpecies(), __tp=tidePreferencesBySpecies(), __series={}, __day={}, __conf={};
const __mo={aube:1,jour:2,'crépuscule':3,nuit:4}, __ti={montante:1,descendante:2,'étale':3};
for(const s of tripPadStops()){
  const days=stayDatesForStop(s), targets=(s.target_species&&s.target_species.length)?s.target_species:Object.keys(__bm);
  for(const sp of targets){
    const spx=DATA.species.find(x=>x.name_fr===sp), g=spx?evidenceGroup(spx.id,'presence','presence',s):null;
    __conf[[s.id,sp].join('|')]=g?{quality:g.quality,n:g.n,authors:g.authors,platforms:g.platforms,groups:g.groups,score:g.score}:null;
  }
  for(const key of days){
    for(const sp of targets){
      const ck=[s.port,key,sp,s.id,30].join('|');
      const arr=speciesWindowSeries(s.port,key,sp,s,30);
      __series[ck]=arr.map(p=>[p.score,__mo[p.moment]||0,p.momentPct==null?-1:p.momentPct,__ti[p.tide]||0,p.tidePct==null?-1:p.tidePct,Math.round((p.movement||0)*1000000),p.momentN||0]);
    }
    const dck=daySummaryCacheKey(s.port,key,targets,s), sum=bestWindowDaySummary(s.port,key,targets,s), w=sum&&sum.window;
    __day[dck]=sum?[sum.score,sum.sp,w?w.from.toISOString():null,w?w.to.toISOString():null,w?w.avg:null,w?w.peak:null]:null;
  }
}
const __s=tripPadStops().find(x=>x.port==='toba'&&stayDatesForStop(x).includes('2026-11-26')); let __reg=null;
if(__s){const bw=bestSpeciesWindows(__s.port,'2026-11-26','Hamachi',__s),w=bw.wins[0],pt=w&&w.points.reduce((a,b)=>!a||b.score>a.score?b:a,null)||bw.peak;__reg={port:__s.port,stop_id:__s.id,score:bw.max,window:w?fmtJST(w.from)+'–'+fmtJST(w.to):null,avg:w&&w.avg||null,peak:w&&w.peak||null,reason:windowReason(pt),proxy:pt&&pt.movement};}
__RESULT={version:3,generated_from:'data.json',step_min:30,bestMoments:__bm,tidePrefs:__tp,series:__series,daySummary:__day,confidence:__conf,regression:__reg};
`;
const ctx={
  console,setTimeout:()=>0,clearTimeout:()=>{},requestAnimationFrame:f=>f(),
  __DATA:DATA,__SYNTH:SYNTH,__LURETYPO:LURETYPO,__TIDES:TIDES,
  window:{addEventListener:()=>{},requestIdleCallback:null},
  document:{getElementById:()=>({innerHTML:'',classList:{add:()=>{},remove:()=>{}},insertAdjacentHTML:()=>{},remove:()=>{}}),createElement:()=>({click:()=>{}})},
  location:{hash:'',reload:()=>{}},navigator:{},localStorage:{getItem:()=>null,setItem:()=>{},removeItem:()=>{}},caches:{},
  URL,Date,Math,JSON,Map,Set,WeakMap,Object,Array,String,Number,Boolean,RegExp,Intl,Error,Promise
};
ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(js+'\n'+append,ctx,{timeout:120000});
writeJSON('decision_cache.json',ctx.__RESULT);
console.log(`runtime cache: ${Object.keys(ctx.__RESULT.series).length} séries · core ${(fs.statSync(path.join(ROOT,'app_core.json')).size/1024).toFixed(1)} KiB · decisions ${(fs.statSync(path.join(ROOT,'decision_cache.json')).size/1024).toFixed(1)} KiB`);
console.log('regression:',ctx.__RESULT.regression);
