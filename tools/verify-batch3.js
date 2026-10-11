(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,message){if(!ok)throw new Error(message);}
var walls=['iron','steel','titanium','dirium','steel-wall-large','titanium-wall-large','dirium-wall-large'];
var wallNames=['iron-wall','steel-wall','titanium-wall','dirium-wall','steel-wall-large','titanium-wall-large','dirium-wall-large'];
var hp=[320,440,600,760,1760,2400,3040];
for(var i=0;i<7;i++){check(block(wallNames[i]).health==hp[i],'Wall health '+wallNames[i]);check(block(wallNames[i]).size==(i<4?1:2),'Wall size');}
['titanium','dirium','uranium'].forEach(function(id){check(item(id)!=null,'Missing resource '+id);});
Vars.world.loadGenerator(48,48,function(tiles){
    tiles.fill();
    for(var x=0;x<48;x++)for(var y=0;y<48;y++)tiles.get(x,y).setFloor(Blocks.stone);
    tiles.get(10,10).setBlock(Blocks.coreShard,Team.sharded,0);
    tiles.get(20,20).setFloor(block('titanium-floor'));
    tiles.get(20,30).setFloor(block('uranium-floor'));
    tiles.get(20,20).setBlock(block('titanium-drill'),Team.sharded,0);
    tiles.get(20,30).setBlock(block('uranium-drill'),Team.sharded,0);
    for(var y=20;y<=30;y+=10){tiles.get(21,y).setBlock(block('conveyor'),Team.sharded,0);tiles.get(23,y).setBlock(Blocks.vault,Team.sharded,0);}
    tiles.get(10,20).setBlock(block('crucible'),Team.sharded,0);
    tiles.get(11,20).setBlock(block('conveyor'),Team.sharded,0);
    tiles.get(13,20).setBlock(Blocks.vault,Team.sharded,0);
    for(var i=0;i<7;i++)tiles.get(5+i*5,40).setBlock(block(wallNames[i]),Team.sharded,0);
});
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;
Vars.state.rules.loadout.clear();
Vars.state.rules.loadout.add(new ItemStack(Items.copper,1000));
Vars.state.rules.loadout.add(new ItemStack(Items.coal,300));
Vars.state.rules.loadout.add(new ItemStack(item('steel'),100));
var tags=new StringMap();tags.put('name','MCE - Advanced Materials Demo');tags.put('author','EliasXbox');tags.put('description','Titanium at (20,20), uranium at (20,30), crucible at (10,20), seven wall variants along y=40. Feed Classic titanium/steel and vanilla coal to the crucible.');tags.put('rules',JsonIO.write(Vars.state.rules));
var demo=Vars.maps.saveMap(tags);
var target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-advanced-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();demo.file.copyTo(target);
var crucible=Vars.world.build(10,20);crucible.items.add(item('titanium'),20);crucible.items.add(item('steel'),20);crucible.items.add(Items.coal,10);
var builds=[];for(var x=0;x<48;x++)for(var y=0;y<48;y++){var b=Vars.world.build(x,y);if(b!=null&&b.tile.x==x&&b.tile.y==y)builds.push(b);}
Time.delta=1;Vars.state.set(GameState.State.playing);
for(var tick=0;tick<6000;tick++){Time.time+=1;builds.forEach(function(b){b.update();});}
var titanium=Vars.world.build(23,20).items.get(item('titanium')), uranium=Vars.world.build(23,30).items.get(item('uranium')),dirium=Vars.world.build(13,20).items.get(item('dirium'));
check(titanium>0&&uranium>0,'Advanced drills/transport failed');check(dirium==20,'Crucible recipe failed');check(crucible.items.get(Items.coal)==0&&crucible.items.get(item('steel'))==0,'Crucible inputs not consumed');
check(Blocks.copperWall.health==320&&Blocks.titaniumWall.health==440,'Vanilla walls changed');
print('MCE_BATCH3_PASS titanium='+titanium+' uranium='+uranium+' dirium='+dirium);
Vars.state.set(GameState.State.menu);
})();
