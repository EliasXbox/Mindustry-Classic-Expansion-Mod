(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var lava=Vars.content.liquid('mindustry-classic-expansion-classic-lava');
var gens=['coal-generator','thermal-generator','combustion-generator','rt-generator'];
Vars.world.loadGenerator(96,48,function(tiles){
 tiles.fill();for(var x=0;x<96;x++)for(var y=0;y<48;y++)tiles.get(x,y).setFloor(Blocks.stone);
 function put(x,y,id){tiles.get(x,y).setBlock(typeof id==='string'?block(id):id,Team.sharded,0);}
 put(5,5,Blocks.coreShard);
 for(var i=0;i<4;i++){var x=10+i*20;put(x,30,gens[i]);put(x+3,30,'power-laser');put(x+5,30,Blocks.battery);}
 put(10,10,'coal-generator');put(12,10,'power-booster');put(16,10,'power-laser');put(20,10,'power-laser-corner');put(24,10,'power-laser-router');put(27,10,'repair-turret');put(27,6,'mega-repair-turret');put(27,13,Blocks.copperWall);put(30,6,Blocks.copperWall);
});
function link(x,y,tx,ty){var n=Vars.world.build(x,y);n.configure(new java.lang.Integer(Point2.pack(tx,ty)));check(n.power.links.contains(Point2.pack(tx,ty)),'Link failed '+x+','+y);}
for(var i=0;i<4;i++){var x=10+i*20;link(x+3,30,x,30);link(x+3,30,x+5,30);}
link(12,10,10,10);link(12,10,16,10);link(16,10,20,10);link(20,10,24,10);link(24,10,27,10);link(24,10,27,6);
check(Vars.world.build(10,10).power.graph===Vars.world.build(27,6).power.graph,'Network disconnected');
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;Vars.state.rules.loadout.clear();
['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),500));});Vars.state.rules.loadout.add(new ItemStack(Items.coal,500));
var tags=new StringMap();tags.put('name','MCE - Power and Repair Demo');tags.put('author','EliasXbox');tags.put('description','Four generators along y=30 connected to batteries. Lower network connects coal generator through booster/laser/corner/router to two repair turrets. Feed coal/uranium or pump lava/oil into the corresponding generators.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-power-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
Vars.world.build(10,30).items.add(Items.coal,10);Vars.world.build(70,30).items.add(item('uranium'),10);Vars.world.build(30,30).liquids.add(lava,30);Vars.world.build(50,30).liquids.add(Liquids.oil,30);
Vars.world.build(10,10).items.add(Items.coal,20);
var walls=[Vars.world.build(27,13),Vars.world.build(30,6)];walls.forEach(function(w){w.health=100;});
var repairs=[Vars.world.build(27,10),Vars.world.build(27,6)];repairs[0].rotation=90;repairs[1].rotation=0;
var builds=[];for(var x=0;x<96;x++)for(var y=0;y<48;y++){var b=Vars.world.build(x,y);if(b!=null&&b.tile.x===x&&b.tile.y===y)builds.push(b);}
Time.delta=1;Vars.state.set(GameState.State.playing);
for(var tick=0;tick<600;tick++){
 Time.update();Time.delta=1;Time.time+=1;
 repairs.forEach(function(t,i){t.target=walls[i];});
 builds.forEach(function(b){b.update();});
 var graphs=[];builds.forEach(function(b){if(b.power!=null&&graphs.indexOf(b.power.graph)<0){graphs.push(b.power.graph);b.power.graph.update();}});
 Groups.bullet.update();
}
var stored=[],expected=[24,2.4,3.6,18];for(var i=0;i<4;i++){var x=10+i*20;var b=Vars.world.build(x+5,30);stored.push(b.power.status*b.block.consPower.capacity);check(Math.abs(stored[i]-expected[i])<.01,'Generator output failed '+gens[i]+': '+stored[i]);}
check(Vars.world.build(10,30).items.get(Items.coal)<10&&Vars.world.build(70,30).items.get(item('uranium'))<10,'Fuel items not consumed');
check(Vars.world.build(30,30).liquids.get(lava)<.01&&Vars.world.build(50,30).liquids.get(Liquids.oil)<.01,'Liquid fuel not consumed');
check(walls[0].health>100&&walls[1].health>100,'Repair failed '+walls[0].health+'/'+walls[1].health);
check(repairs[0].power.status>0&&repairs[1].power.status>0,'Repair network unpowered');
check(block('power-booster').laserRange===4&&block('power-laser').maxNodes===2&&block('power-laser-corner').maxNodes===2&&block('power-laser-router').maxNodes===4,'Node parameters wrong');
check(Blocks.powerNode.maxNodes===10&&Blocks.combustionGenerator.powerProduction===1,'Vanilla power changed');
print('MCE_BATCH7_PASS stored='+stored.join('/')+' repaired='+walls[0].health+'/'+walls[1].health+' network=linked');Vars.state.set(GameState.State.menu);
})();
