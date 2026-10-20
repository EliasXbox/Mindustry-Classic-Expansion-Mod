(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var ids=['turret','double-turret','machine-turret','shotgun-turret','flame-turret','sniper-turret','mortar-turret','plasma-turret','chain-turret','titan-cannon'];
var ammo=[item('stone'),item('stone'),item('iron'),item('iron'),Items.coal,item('steel'),Items.coal,Items.coal,item('uranium'),item('uranium')];
var multipliers=[20,20,20,20,20,20,5,40,8,4],shots=[1,2,1,5,1,1,3,1,2,1];
var hp=[45,45,65,70,90,70,110,180,430,800],range=[52,44,65,50,45,120,120,60,80,120],reload=[15,13,7,30,5,50,55,3,5,23];
Vars.world.loadGenerator(192,48,function(tiles){
 tiles.fill();for(var x=0;x<192;x++)for(var y=0;y<48;y++)tiles.get(x,y).setFloor(Blocks.stone);
 tiles.get(5,5).setBlock(Blocks.coreShard,Team.sharded,0);
 for(var i=0;i<10;i++){var x=12+i*18;tiles.get(x,10).setBlock(block(ids[i]),Team.sharded,0);tiles.get(x,16).setBlock(Blocks.thoriumWallLarge,Team.crux,0);tiles.get(x,8).setBlock(Blocks.itemSource,Team.sharded,1);}
});
for(var i=0;i<10;i++){
 var b=block(ids[i]);check(b.health===hp[i]&&b.range===range[i]&&b.reload===reload[i],'Turret parameters '+ids[i]);check(b.size===(i===8?2:i===9?3:1),'Turret size');
 var t=Vars.world.build(12+i*18,10);check(!t.acceptItem(t,Items.copper),'Accepts wrong ammo '+ids[i]);check(t.acceptItem(t,ammo[i]),'Rejects correct ammo');
}
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;Vars.state.rules.loadout.clear();
['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),500));});Vars.state.rules.loadout.add(new ItemStack(Items.coal,500));
var tags=new StringMap();tags.put('name','MCE - Ammo Turrets Demo');tags.put('author','EliasXbox');tags.put('description','Ten Classic ammo turrets left to right: basic, double, machine, shotgun, flame, sniper, mortar, plasma, chain, Titan. Configure the item source below each turret with its ammo. Enemy walls are test targets.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-turrets-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
var turrets=[],targets=[];
for(var i=0;i<10;i++){var t=Vars.world.build(12+i*18,10),wall=Vars.world.build(12+i*18,16);wall.health=100000;t.rotation=90;t.target=wall;t.handleStack(ammo[i],2,t);check(t.totalAmmo===multipliers[i]*2,'Ammo conversion '+ids[i]);turrets.push(t);targets.push(wall);}
Vars.state.set(GameState.State.playing);Time.delta=1;
for(var tick=0;tick<2400;tick++){
 Time.update();Time.delta=1;Time.time+=1;
 turrets.forEach(function(t,i){t.target=targets[i];t.update();});
 Groups.bullet.update();
}
var results=[];
for(var i=0;i<10;i++){var t=turrets[i],damage=100000-targets[i].health;print('MCE_TURRET '+ids[i]+' shots='+t.totalShots+' ammo='+t.totalAmmo+' damage='+damage);check(t.totalAmmo===0,'Ammo not consumed '+ids[i]);check(t.totalShots===multipliers[i]*shots[i],'Volley count '+ids[i]);check(damage>0,'Projectile did not damage target '+ids[i]);results.push(t.totalShots);}
check(Blocks.duo.health===250&&Blocks.duo.reload===20,'Vanilla duo changed');
print('MCE_BATCH6_PASS shots='+results.join('/')+' ammo=0 damage=10/10');Vars.state.set(GameState.State.menu);
})();
