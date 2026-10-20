(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var lava=Vars.content.liquid('mindustry-classic-expansion-classic-lava');
var ids=['coal-purifier','titanium-purifier','oil-refinery','stone-former','lava-smelter'];
var liquids=[Liquids.water,Liquids.water,Liquids.oil,lava,lava];
var inputs=[item('stone'),item('iron'),null,null,item('iron')];
var outputs=[Items.coal,item('titanium'),Items.coal,item('stone'),item('steel')];
var amounts=[5,6,0,0,1], times=[50,60,60,12,30], totals=[18.99,40,45,16,40];
Vars.world.loadGenerator(64,48,function(tiles){
 tiles.fill();for(var x=0;x<64;x++)for(var y=0;y<48;y++)tiles.get(x,y).setFloor(Blocks.stone);
 function put(x,y,id,rot){tiles.get(x,y).setBlock(typeof id==='string'?block(id):id,Team.sharded,rot||0);}
 put(5,5,Blocks.coreShard);
 for(var i=0;i<5;i++){var x=8+i*10;put(x,15,ids[i]);put(x+1,15,'steel-conveyor');put(x+3,15,Blocks.vault);put(x,14,'conduit',1);}
 tiles.get(8,13).setFloor(Blocks.water);put(8,13,'pump');
 tiles.get(18,13).setFloor(Blocks.water);put(18,13,'flux-pump');
 put(28,13,Blocks.liquidSource);
 tiles.get(38,13).setFloor(block('lava-floor'));put(38,13,'pump');
 tiles.get(48,13).setFloor(block('lava-floor'));put(48,13,'flux-pump');
 tiles.get(10,30).setFloor(block('coal-floor'));put(10,30,'coal-drill');put(11,30,'steel-conveyor');put(13,30,Blocks.vault);
 tiles.get(25,30).setFloor(block('uranium-floor'));put(25,30,'omni-drill');put(26,30,'steel-conveyor');put(28,30,Blocks.vault);
 put(40,30,'door');put(41,30,'door');put(46,30,'door-large');
});
Vars.world.build(28,13).configure(Liquids.oil);
Vars.world.build(40,30).configure(true);check(Vars.world.build(40,30).open&&Vars.world.build(41,30).open,'Door chain did not open');
Vars.world.build(40,30).configure(false);check(!Vars.world.build(40,30).open&&!Vars.world.build(41,30).open,'Door chain did not close');
Vars.world.build(46,30).configure(true);check(!Vars.world.build(46,30).checkSolid(),'Large door solidity wrong');
check(block('door').health===360&&block('door-large').health===1440&&block('door-large').size===2,'Door health/size wrong');
check(block('flux-pump').pumpAmount===3&&!block('flux-pump').hasPower,'Flux pump rate/power wrong');
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;Vars.state.rules.loadout.clear();
['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),500));});Vars.state.rules.loadout.add(new ItemStack(Items.coal,500));
var tags=new StringMap();tags.put('name','MCE - Production and Doors Demo');tags.put('author','EliasXbox');tags.put('description','Five liquid crafters along y=15; pumps and lava pools below. Coal drill (10,30), omni drill (25,30). Linked small doors (40,30)/(41,30); large open door (46,30). Feed stone/iron to purifiers and iron to lava smelter.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-production-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
var builds=[];for(var x=0;x<64;x++)for(var y=0;y<48;y++){var b=Vars.world.build(x,y);if(b!=null&&b.tile.x===x&&b.tile.y===y)builds.push(b);}
// Isolate ten recipes, with 0.02 extra liquid for v7 float rounding, in a larger test buffer.
// Existing pumps remain disabled during this part so consumption can be measured.
for(var i=0;i<5;i++){var b=Vars.world.build(8+i*10,15);b.block.liquidCapacity=1000;b.liquids.clear();b.liquids.add(liquids[i],totals[i]*10+0.02);if(inputs[i]!=null)b.items.add(inputs[i],amounts[i]*10);}
[[8,13],[18,13],[28,13],[38,13],[48,13]].forEach(function(p){Vars.world.build(p[0],p[1]).enabled=false;});
Time.delta=1;Vars.state.set(GameState.State.playing);
for(var tick=0;tick<6000;tick++){Time.time+=1;builds.forEach(function(b){b.update();});}
var counts=[];
for(var i=0;i<5;i++){var x=8+i*10,b=Vars.world.build(x,15),n=Vars.world.build(x+3,15).items.get(outputs[i]);counts.push(n);check(n===10,'Recipe '+ids[i]+' produced '+n+' instead of 10');if(inputs[i]!=null)check(b.items.get(inputs[i])===0,'Recipe input not consumed');check(b.liquids.get(liquids[i])<0.05,'Recipe liquid consumption wrong');b.block.liquidCapacity=[21,41,46,21,41][i];}
var coal=Vars.world.build(13,30).items.get(Items.coal),uranium=Vars.world.build(28,30).items.get(item('uranium'));
check(coal>0&&uranium>coal,'Coal/omni extraction failed');
// Restore ordinary buffers and verify pumps feed the actual processing chains.
for(var i=0;i<5;i++){var b=Vars.world.build(8+i*10,15);b.liquids.clear();if(inputs[i]!=null)b.items.add(inputs[i],amounts[i]*5);}
[[8,13],[18,13],[28,13],[38,13],[48,13]].forEach(function(p){Vars.world.build(p[0],p[1]).enabled=true;});
for(var tick=0;tick<1200;tick++){Time.time+=1;builds.forEach(function(b){b.update();});}
for(var i=0;i<5;i++)check(Vars.world.build(11+i*10,15).items.get(outputs[i])>10,'Pumped chain failed '+ids[i]);
check(Blocks.door.health===400&&Blocks.doorLarge.health===1600,'Vanilla doors changed');
print('MCE_BATCH5_PASS recipes='+counts.join('/')+' coal='+coal+' omniUranium='+uranium+' pumpChains=5 doors=open/close');
Vars.state.set(GameState.State.menu);
})();
