(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,message){if(!ok)throw new Error(message);}
function put(tiles,x,y,id,rot){tiles.get(x,y).setBlock(typeof id==='string'?block(id):id,Team.sharded,rot||0);}
Vars.world.loadGenerator(48,48,function(tiles){
 tiles.fill();for(var x=0;x<48;x++)for(var y=0;y<48;y++)tiles.get(x,y).setFloor(Blocks.stone);
 put(tiles,5,5,Blocks.coreShard);
 [[9,10],[9,20],[23,10],[25,8],[8,30],[18,25]].forEach(function(p){put(tiles,p[0],p[1],Blocks.itemSource);});
 for(var y=10;y<=20;y+=10){for(var x=10;x<=12;x++)put(tiles,x,y,y===10?'steel-conveyor':'pulse-conveyor');put(tiles,14,y,Blocks.vault);}
 put(tiles,24,10,'steel-conveyor');put(tiles,25,9,'pulse-conveyor',1);put(tiles,25,10,'junction');put(tiles,26,10,'steel-conveyor');put(tiles,28,10,Blocks.vault);put(tiles,25,11,'pulse-conveyor',1);put(tiles,25,13,Blocks.vault);
 put(tiles,9,30,'steel-conveyor');put(tiles,10,30,'sorter');put(tiles,11,30,'steel-conveyor');put(tiles,13,30,Blocks.vault);put(tiles,10,31,'pulse-conveyor',1);put(tiles,10,33,Blocks.vault);
 put(tiles,19,25,'steel-conveyor');put(tiles,20,25,'tunnel');put(tiles,23,25,'tunnel');put(tiles,24,25,'steel-conveyor');put(tiles,26,25,Blocks.vault);
 tiles.get(5,40).setFloor(Blocks.water);put(tiles,5,40,'pump');put(tiles,6,40,'conduit');put(tiles,7,40,'pulse-conduit');put(tiles,8,40,'liquid-junction');put(tiles,9,40,'liquid-router');put(tiles,11,40,Blocks.liquidTank);
 put(tiles,8,39,'liquid-router');put(tiles,8,41,'pulse-conduit',1);put(tiles,8,43,Blocks.liquidTank);
});
Vars.world.build(10,30).configure(item('iron'));
Vars.world.build(20,25).configure(new Point2(3,0));
check(Vars.world.build(20,25).link===Point2.pack(23,25),'Tunnel configuration failed');
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;Vars.state.rules.loadout.clear();
['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),500));});
var tags=new StringMap();tags.put('name','MCE - Transport and Liquids Demo');tags.put('author','EliasXbox');tags.put('description','Steel/pulse conveyors y=10/20. Item crossing (25,10). Iron sorter (10,30). Tunnel (20,25) linked to (23,25). Water pump (5,40), conduits and liquid crossing (8,40). Feed oil from south to test separate flows.');tags.put('rules',JsonIO.write(Vars.state.rules));
var demo=Vars.maps.saveMap(tags);var target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-transport-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();demo.file.copyTo(target);
var builds=[];for(var x=0;x<48;x++)for(var y=0;y<48;y++){var b=Vars.world.build(x,y);if(b!=null&&b.tile.x==x&&b.tile.y==y)builds.push(b);}
function feed(x,y,id){var b=Vars.world.build(x,y),it=item(id);var source=Vars.world.build(x-(b.rotation===0?1:0),y-(b.rotation===1?1:0));if(b.acceptItem(source,it))b.handleItem(source,it);}
Time.delta=1;Vars.state.set(GameState.State.playing);
for(var tick=0;tick<6000;tick++){
 Time.time+=1;
 if(tick%120===0){feed(10,10,'iron');feed(10,20,'iron');feed(24,10,'iron');feed(25,9,'steel');feed(9,30,tick%240===0?'iron':'steel');feed(19,25,'iron');}
 Vars.world.build(8,39).liquids.add(Liquids.oil,Math.max(0,10-Vars.world.build(8,39).liquids.get(Liquids.oil)));
 builds.forEach(function(b){b.update();});
}
function count(x,y,id){return Vars.world.build(x,y).items.get(item(id));}
check(count(14,10,'iron')===50&&count(14,20,'iron')===50,'Conveyor throughput failed');
check(count(28,10,'iron')===50&&count(25,13,'steel')===50,'Item crossing failed');
check(count(28,10,'steel')===0&&count(25,13,'iron')===0,'Item crossing mixed resources');
check(count(13,30,'iron')===25&&count(10,33,'steel')===25,'Sorter failed');
check(count(13,30,'steel')===0&&count(10,33,'iron')===0,'Sorter wrong destination');
check(count(26,25,'iron')===50,'Tunnel failed');
var water=Vars.world.build(11,40).liquids.get(Liquids.water),oil=Vars.world.build(8,43).liquids.get(Liquids.oil);
check(water>100&&oil>100,'Pump/conduits/liquid crossing failed: '+water+' / '+oil);
check(Vars.world.build(11,40).liquids.get(Liquids.oil)===0&&Vars.world.build(8,43).liquids.get(Liquids.water)===0,'Liquid crossing mixed liquids');
check(!block('tunnel').hasPower&&block('pump').pumpAmount===2,'Power/rate changed');
check(Math.abs(Blocks.conveyor.speed-0.03)<0.000001&&Math.abs(Blocks.mechanicalPump.pumpAmount-7/60)<0.000001,'Vanilla transport/pump changed');
print('MCE_BATCH4_PASS conveyors=50/50 junction=50/50 sorter=25/25 tunnel=50 water='+water+' oil='+oil);
Vars.state.set(GameState.State.menu);
})();
