/* Clockwise campus: 28 question tiles, 6 special tiles; landing always triggers. */
const Campus=(()=>{
const special={6:['同事','colleague'],18:['午餐','work'],14:['校長','principal'],19:['午休','work'],25:['打掃時間','work'],29:['同事','colleague']};
const tiles=Array.from({length:36},(_,i)=>{const [name,type]=i===0?['上班','start']:i===35?['下班','finish']:special[i]||['問號','question'];return {name,type,row:i<10?1:i<19?i-8:i<28?10:37-i,col:i<10?i+1:i<19?10:i<28?28-i:1}});
function d6(rng=Math.random){return 1+Math.floor(rng()*6)}
function advance(position,die){return Math.min(tiles.length-1,position+die)}
return {tiles,d6,advance};})();
if(typeof module!=='undefined')module.exports=Campus;
