const assert=require('node:assert/strict');
const {EVENTS,SOURCES,COMPLAINTS}=require('./events.js'),R=require('./engine.js'),C=require('./board.js');
assert.equal(EVENTS.length,20);assert.equal(COMPLAINTS.length,36);
for(const e of EVENTS){assert(SOURCES.some(s=>s.id===e.source));assert.equal(e.choices.length,e.practice?3:e.source===2?1:2);assert.equal(e.choices.filter(c=>c[1]).length,e.practice?0:1);
for(const c of e.choices)for(let die=1;die<=20;die++)for(const endpoint of [0,.999999]){let first=true;const rng=()=>{if(first){first=false;return (die-.5)/20}return endpoint};const r=R.resolve(e,c,4,rng);assert.equal(r.die,die);const range=e.practice?(c[3]?(r.success?[0,0]:[1,3]):r.success?[5,10]:[10,30]):c[1]?(r.success?[10,30]:[30,60]):r.success?[0,0]:[1,10];assert.equal(r.san,range[endpoint===0?0:1]);if(e.source===2)assert.equal(r.money,1400000);if(e.practice||!c[1])assert.equal(r.money,0);const applied=R.apply({money:1,san:1},r);assert(applied.money>=0&&applied.san>=0&&applied.san<=100)}}
assert.equal(C.tiles.filter(t=>t.type==='principal').length,1);assert.equal(C.tiles.filter(t=>t.type==='question').length,28);assert.equal(C.tiles.filter(t=>t.name==='午餐').length,1);assert.equal(C.tiles.filter(t=>['news','rest','class'].includes(t.type)).length,0);
assert.equal(C.tiles.length,36);assert.equal(new Set(C.tiles.map(t=>`${t.row},${t.col}`)).size,36);for(let i=1;i<C.tiles.length;i++)assert.equal(Math.abs(C.tiles[i].row-C.tiles[i-1].row)+Math.abs(C.tiles[i].col-C.tiles[i-1].col),1);
assert.equal(C.advance(34,6),35);assert.equal(C.d6(()=>0),1);assert.equal(C.d6(()=>.99999),6);assert.equal(R.colleague(9),'harm');assert.equal(R.colleague(10),'neutral');assert.equal(R.colleague(11),'help');
const effects=[{kind:'help'},{kind:'help'},{kind:'harm'},{kind:'parent'},{kind:'parent'},{kind:'principal'}];assert.deepEqual(R.dailyEffects(effects,()=>0).map(x=>x.loss),[-1,-1,1,10,10,10]);assert.deepEqual(R.dailyEffects(effects,()=>.99999).map(x=>x.loss),[-10,-10,10,10,10,10]);
console.log('PASS: all SAN range endpoints for every choice and D20, fixed fees, 28 question / 6 special tiles, stacked daily effects, D6 and D20 boundaries.');

const counts={};for(let i=0;i<1000;i++){const k=R.questionKind(()=>(i+.5)/1000);counts[k]=(counts[k]||0)+1}assert.deepEqual(counts,{quiet:250,complaint:350,news:150,class:250});
assert.equal(R.penalty,undefined);assert.equal(R.adjusted,undefined);for(let die=1;die<=20;die++)assert.equal(R.rollResult(die,20).die,die);for(let die=1;die<=6;die++)assert.equal(R.rollResult(die,6).die,die);console.log('PASS: SAN penalty functions removed, raw D6/D20, 25/35/15/25 split.');

assert.equal(C.tiles[18].name,'午餐');assert.equal(C.tiles[19].name,'午休');assert.equal(C.tiles[10].type,'question');assert.equal(C.tiles[17].type,'question');
for(const [n,kind] of [[0,'quiet'],[.24999,'quiet'],[.25,'complaint'],[.59999,'complaint'],[.60,'news'],[.74999,'news'],[.75,'class'],[.99999,'class']])assert.equal(R.questionKind(()=>n),kind);
console.log('PASS: lunch18/rest19, exact probability boundaries, alternate news choices always cost zero money, correct practice failure1–3.');
