var prefix='mindustry-classic-expansion-classic-enemy-';
var worldSerial=0;
var children={};
Events.on(WorldLoadEvent,cons(function(){worldSerial++;children={};}));
function makeSpawner(){var ability=extend(Ability,{
 copy:function(){return makeSpawner();},
 localized:function(){return 'Classic: até 6 Fast, próximos ao núcleo inimigo';},
 update:function(unit){
  if(Vars.net.client()||unit.dead)return;
  var oldCount=Math.floor(this.data/1000),timer=this.data-oldCount*1000;
  var linked=(children[unit.id]||[]).filter(function(child){return child.isAdded()&&!child.dead;});children[unit.id]=linked;
  var count=linked.length;this.data=count*1000+timer;
  if(count>=6)return;
  var core=Vars.state.teams.closestEnemyCore(unit.x,unit.y,unit.team);
  if(core==null||!unit.within(core,90))return;
  timer+=Time.delta;
  if(timer>=190){
   var child=Vars.content.unit(prefix+'fast').create(unit.team);
   var offset=new Vec2().trns(unit.rotation,20);child.set(unit.x+offset.x,unit.y+offset.y);child.rotation=unit.rotation;child.add();
   linked.push(child);count++;timer=0;
  }
  this.data=count*1000+timer;
 }
});return ability;}
var fortress=extend(UnitType,'classic-enemy-fortress',{});
fortress.constructor=prov(function(){return UnitEntity.create();});
fortress.abilities.add(makeSpawner());
Packages.mindustry.io.SaveVersion.addCustomChunk('mce-fortress-v1',new Packages.mindustry.io.SaveFileReader.CustomChunk({
 write:function(out){
  var units=[];Groups.unit.each(cons(function(u){if(u.type===fortress&&!u.dead)units.push(u);}));
  out.writeInt(units.length);units.forEach(function(u){out.writeInt(u.id);out.writeFloat(u.x);out.writeFloat(u.y);out.writeInt(u.team.id);out.writeFloat(u.abilities[0].data);var linked=(children[u.id]||[]).filter(function(c){return c.isAdded()&&!c.dead;});out.writeInt(linked.length);linked.forEach(function(c){out.writeInt(c.id);out.writeFloat(c.x);out.writeFloat(c.y);});});
 },
 read:function(input){
  var count=input.readInt(),used={};
  for(var i=0;i<count;i++){
   var id=input.readInt(),x=input.readFloat(),y=input.readFloat(),team=input.readInt(),data=input.readFloat(),found=null;
   Groups.unit.each(cons(function(u){if(found==null&&u.type===fortress&&u.team.id===team&&!used[u.id]&&(u.id===id||(Math.abs(u.x-x)<.001&&Math.abs(u.y-y)<.001)))found=u;}));
   var linked=[],childCount=input.readInt();for(var j=0;j<childCount;j++){var cid=input.readInt(),cx=input.readFloat(),cy=input.readFloat(),child=null;Groups.unit.each(cons(function(u){if(child==null&&u.type===Vars.content.unit(prefix+'fast')&&u.team.id===team&&!used[u.id]&&(u.id===cid||(Math.abs(u.x-cx)<.001&&Math.abs(u.y-cy)<.001)))child=u;}));if(child!=null){linked.push(child);used[child.id]=true;}}
   if(found!=null){found.abilities[0].data=linked.length*1000+Math.max(0,Math.min(189,data%1000));children[found.id]=linked;used[found.id]=true;}
  }
 },
 writeNet:function(){return false;}
}));
var target=extend(UnitType,'classic-enemy-target',{
 killed:function(unit){
  this.super$killed(unit);
  if(Vars.net.client())return;
  var serial=worldSerial,x=unit.x,y=unit.y,team=unit.team;
  Time.run(100,run(function(){if(worldSerial===serial&&Vars.state.isGame()){var next=target.create(team);next.set(x,y);next.add();}}));
 }
});
target.constructor=prov(function(){return UnitEntity.create();});
exports.fortress=fortress;exports.target=target;
