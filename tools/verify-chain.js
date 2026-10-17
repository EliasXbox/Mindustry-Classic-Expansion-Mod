(function(){
var prefix = 'mindustry-classic-expansion-';
function b(blockId){return Vars.content.block(prefix + 'classic-' + blockId);}
function it(itemId){return Vars.content.item(prefix + 'classic-' + itemId);}
function check(value, message){if(!value) throw new Error(message);}
['stone-drill','iron-drill','smelter','conveyor','router','stone-wall','stone-floor','iron-floor'].forEach(function(blockId2){check(b(blockId2)!=null,'Missing block '+blockId2);});
['stone','iron','steel'].forEach(function(itemId2){check(it(itemId2)!=null,'Missing item '+itemId2);});
check(b('stone-wall').requirements[0].item==it('stone'),'Wall must consume Classic stone');
check(Blocks.copperWall.health==320&&Blocks.copperWall.requirements[0].amount==6,'Vanilla wall changed');
Vars.world.loadGenerator(48,48, function(tiles){
    tiles.fill();
    for(var x=0;x<48;x++) for(var y=0;y<48;y++) tiles.get(x,y).setFloor(Blocks.stone);
    for(var x=18;x<=20;x++) for(var y=19;y<=21;y++) tiles.get(x,y).setFloor(b('stone-floor'));
    for(var x=18;x<=20;x++) for(var y=29;y<=31;y++) tiles.get(x,y).setFloor(b('iron-floor'));
    tiles.get(10,10).setBlock(Blocks.coreShard,Team.sharded,0);
    tiles.get(20,20).setBlock(b('stone-drill'),Team.sharded,0);
    tiles.get(21,20).setBlock(b('conveyor'),Team.sharded,0);
    tiles.get(22,20).setBlock(b('router'),Team.sharded,0);
    tiles.get(24,20).setBlock(Blocks.vault,Team.sharded,0);
    tiles.get(20,30).setBlock(b('iron-drill'),Team.sharded,0);
    for(var x=21;x<=24;x++) tiles.get(x,30).setBlock(b('conveyor'),Team.sharded,0);
    tiles.get(25,30).setBlock(b('smelter'),Team.sharded,0);
    tiles.get(26,30).setBlock(b('conveyor'),Team.sharded,0);
    tiles.get(27,30).setBlock(b('router'),Team.sharded,0);
    tiles.get(29,30).setBlock(Blocks.vault,Team.sharded,0);
    tiles.get(8,15).setBlock(b('stone-wall'),Team.sharded,0);
});
Vars.state.rules.waves=false;
Vars.state.rules.attackMode=false;
Vars.state.rules.infiniteResources=false;
Vars.state.rules.loadout.clear();
Vars.state.rules.loadout.add(new ItemStack(Items.copper,1000));
Vars.state.rules.loadout.add(new ItemStack(Items.coal,300));
var tags = new StringMap();
tags.put('name','MCE - Classic Chain Demo');
tags.put('author','EliasXbox');
tags.put('description','Alpha 0.2: Classic stone mining and transport at (20,20), iron-to-steel chain at (20,30). Feed vanilla coal to the Classic smelter at (25,30).');
tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags);
var target=new Fi(typeof MCE_MAP_OUTPUT === 'undefined' ? 'maps/classic-chain-demo.msav' : MCE_MAP_OUTPUT);
target.parent().mkdirs();
map.file.copyTo(target);
print('MCE_MAP_GENERATED '+target.absolutePath());
// Run the real building updates, with no input item cheats on either drill.
var stoneDrill=Vars.world.build(20,20), ironDrill=Vars.world.build(20,30);
var smelter=Vars.world.build(25,30);
smelter.items.add(Items.coal,20);
var builds=[];
for(var x=18;x<32;x++) for(var y=18;y<32;y++){
    var build=Vars.world.build(x,y);
    if(build!=null&&build.tile.x==x&&build.tile.y==y) builds.push(build);
}
Time.delta=1;
Vars.state.set(GameState.State.playing);
for(var tick=0;tick<6000;tick++){
    Time.time+=1;
    builds.forEach(function(build){build.update();});
}
var stoneOut=Vars.world.build(24,20).items.get(it('stone'));
var steelOut=Vars.world.build(29,30).items.get(it('steel'));
check(stoneOut>0,'Stone mining/transport chain produced no stone');
check(steelOut>=5,'Iron/conveyor/smelter/router chain produced no steel');
check(smelter.items.get(Items.coal)<20,'Smelter did not consume coal');
print('MCE_BATCH_CHAIN_PASS stone='+stoneOut+' steel='+steelOut+' remainingCoal='+smelter.items.get(Items.coal));
Vars.state.set(GameState.State.menu);
})();
