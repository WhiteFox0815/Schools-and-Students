const Rules = (()=>{
function random(a,b,rng=Math.random){return a+Math.floor(rng()*(b-a+1))}
function roll(rng=Math.random){return random(1,20,rng)}
function shuffle(a,rng=Math.random){a=[...a];for(let i=a.length-1;i>0;i--){const j=random(0,i,rng);[a[i],a[j]]=[a[j],a[i]]}return a}
function rollResult(raw,sides){return {raw,die:raw,sides}}
function questionKind(rng=Math.random){const n=rng();return n<.25?'quiet':n<.60?'complaint':n<.75?'news':'class'}
function resolve(event,choice,bonus=0,rng=Math.random){const draw=rollResult(roll(rng),20),{raw,die}=draw,success=raw===20||(raw!==1&&die+bonus>=event.dc);let money=0,san=0;
if(event.practice){san=choice[3]?(success?0:random(1,3,rng)):(success?random(5,10,rng):random(10,30,rng))}
else if(choice[1]){money=event.source===2?1400000:random(60000,180000,rng)+(success?0:random(20000,70000,rng));san=success?random(10,30,rng):random(30,60,rng)}
else{money=0;san=success?0:random(1,10,rng)}
return {...draw,bonus,success,money,san,echo:!!choice[1],practice:!!event.practice,recommended:!!choice[3]}}
function apply(state,result){return {...state,money:Math.max(0,state.money-result.money),san:Math.max(0,Math.min(100,state.san-result.san))}}
function colleague(die){return die>10?'help':die<10?'harm':'neutral'}
function dailyEffects(effects,rng=Math.random){return effects.map(e=>({...e,loss:e.kind==='help'?-random(1,10,rng):e.kind==='harm'?random(1,10,rng):10}))}
return {random,roll,shuffle,resolve,apply,colleague,dailyEffects,rollResult,questionKind};})();
if(typeof module!=='undefined')module.exports=Rules;
