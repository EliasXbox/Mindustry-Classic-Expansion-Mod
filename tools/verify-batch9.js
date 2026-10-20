(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var names=['stone','blackstone','dirt','sand','ice','snow','grass','water','deepwater','oil','lava','iron','coal','titanium','uranium'];
Vars.world.loadGenerator(160,64,function(tiles){
 tiles.fill();for(var x=0;x<160;x++)for(var y=0;y<64;y++){var n=names[Math.min(14,Math.floor(x/10))];tiles.get(x,y).setFloor(block(n+'-floor'));}
 tiles.get(5,8).setBlock(block('core'),Team.sharded);
 tiles.get(15,35).setBlock(block('stone-drill'),Team.sharded);
 tiles.get(15,37).setBlock(Blocks.vault,Team.sharded);
 tiles.get(72,35).setBlock(block('pump'),Team.sharded);tiles.get(72,36).setBlock(block('conduit'),Team.sharded,1);tiles.get(72,38).setBlock(Blocks.liquidTank,Team.sharded);
 tiles.get(92,35).setBlock(block('pump'),Team.sharded);tiles.get(92,36).setBlock(block('conduit'),Team.sharded,1);tiles.get(92,38).setBlock(Blocks.liquidTank,Team.sharded);
});
Vars.state.rules.waves=false;Vars.state.rules.loadout.clear();['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),1000));});
var tags=new StringMap();tags.put('name','MCE - Environments and Core Demo');tags.put('author','EliasXbox');tags.put('description','Classic floor strips from left: stone, blackstone, dirt, sand, ice, snow, grass, water, deepwater, oil, lava and four ores. Classic core at (5,8), blackstone drill at (15,35), water/oil pumps at (72,35)/(92,35).');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-environments-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
var core=Team.sharded.core();check(core.block===block('core')&&core.health===800&&core.block.size===3,'Core identity/health/size');
check(core.block.unitType.name==='mindustry-classic-expansion-classic-player-blaster','Core player type');
check(core.block.itemCapacity===10000,'Core capacity');var stoneBefore=core.items.get(item('stone')),sandBefore=core.items.get(Items.sand);core.handleItem(null,item('stone'));core.handleItem(null,Items.sand);check(core.items.get(item('stone'))===stoneBefore+1&&core.items.get(Items.sand)===sandBefore+1,'Core storage');
check(block('blackstone-floor').itemDrop===item('stone'),'Blackstone deposit');check(block('sand-floor').itemDrop==null,'Classic sand must not gain a new drop');
check(block('water-floor').liquidDrop===Liquids.water&&block('deepwater-floor').isLiquid&&block('oil-floor').liquidDrop===Liquids.oil,'Liquid floors');
var builds=[];Groups.build.each(cons(function(b){builds.push(b);}));Vars.state.set(GameState.State.playing);
for(var tick=0;tick<660;tick++){Time.update();Time.delta=1;Time.time+=1;builds.forEach(function(b){b.update();});}
check(Vars.world.build(15,37).items.get(item('stone'))>=2,'Blackstone extraction');
check(Vars.world.build(72,38).liquids.get(Liquids.water)>0&&Vars.world.build(92,38).liquids.get(Liquids.oil)>0,'Water/oil pumping');
SaveIO.save(new Fi('batch9-save.msav'));SaveIO.load(new Fi('batch9-save.msav'));check(Team.sharded.core().block===block('core')&&Team.sharded.core().items.get(item('stone'))===stoneBefore+1,'Core save/load');
check(Blocks.coreShard.health===1100&&Blocks.water.liquidDrop===Liquids.water,'Vanilla core/floor changed');
print('MCE_BATCH9_PASS floors=9 core=800/3x3 storage=10000 blaster=custom blackstone=mined liquids=water/oil save=ok vanilla=ok');Vars.state.set(GameState.State.menu);
})();


