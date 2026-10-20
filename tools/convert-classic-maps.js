(function(){
function check(ok,message){if(!ok)throw new Error(message);}
function sha256(file){var digest=java.security.MessageDigest.getInstance('SHA-256').digest(file.readBytes()),hex=String(new java.math.BigInteger(1,digest).toString(16));while(hex.length<64)hex='0'+hex;return hex;}
var root=new Fi(typeof MCE_ROOT==='undefined'?'../mce':MCE_ROOT);
var inventory=JSON.parse(root.child('docs/classic-map-inventory.json').readString());
var waves=JSON.parse(root.child('map-source/waves.json').readString());
var floors=['stone','deepwater','water','lava','oil','blackstone','iron','coal','titanium','uranium','dirt','sand','ice','snow','grass'];
var walls=['air','stone-environment-wall','grass-wall','blackstone-wall','sand-wall','snow-wall','rock','ice-rock','shrub','black-rock'];
var report=[];
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function unit(id){return Vars.content.unit('mindustry-classic-expansion-classic-enemy-'+id);}
function reachable(cx,cy,width,height){
 var seen=new java.util.BitSet(width*height),queue=[cy*width+cx],head=0,ore=[0,0,0,0];seen.set(queue[0]);
 while(head<queue.length){var p=queue[head++],x=p%width,y=Math.floor(p/width),tile=Vars.world.tile(x,y),id=floors.indexOf(String(tile.floor().name).replace('mindustry-classic-expansion-classic-','').replace('-floor',''));if(id>=6&&id<=9)ore[id-6]++;
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var xx=x+d[0],yy=y+d[1];if(xx<0||yy<0||xx>=width||yy>=height)return;var pos=yy*width+xx;if(seen.get(pos))return;var t=Vars.world.tile(xx,yy);if(t.floor().isLiquid||(t.block().solid&&t.build==null))return;seen.set(pos);queue.push(pos);});
 }return {seen:seen,tiles:queue.length,ore:ore};
}
inventory.maps.forEach(function(entry){
 var data=JSON.parse(root.child('map-source/'+entry.name+'.json').readString()),width=data.width,height=data.height,cells=[];
 for(var i=0;i<data.rle.length;i+=2)for(var n=0;n<data.rle[i+1];n++)cells.push(data.rle[i]);check(cells.length===width*height,'RLE size '+entry.name);check(Object.keys(data.unknown).length===0,'Unknown palette '+entry.name);
 Vars.logic.reset();
 Vars.world.loadGenerator(width,height,function(tiles){tiles.fill();for(var y=0;y<height;y++)for(var x=0;x<width;x++){var code=cells[y*width+x],t=tiles.get(x,y);t.setFloor(block(floors[code&15]+'-floor'));if((code>>4)!==0)t.setBlock(block(walls[code>>4]));}
  var cx=data.core%width,cy=Math.floor(data.core/width);tiles.get(cx,cy).setBlock(block('core'),Team.sharded);
  function set(x,y,id,rotation){if(x<0||y<0||x>=width||y>=height)return;var t=tiles.get(x,y);if(id==='stone-drill')t.setFloor(block('stone-floor'));var r=rotation<0?-rotation+2:rotation;t.setBlock(id==='air'?Blocks.air:block(id),Team.sharded,r%4);}
  if(entry.name!=='tutorial'){
   var flip=entry.flipBase?-1:1,fr=entry.flipBase?2:0;set(cx,cy-2*flip,'conveyor',1+fr);set(cx,cy-3*flip,'conveyor',1+fr);
   [-1,1].forEach(function(d){set(cx+2*d,cy-2*flip,'stone-drill',d);set(cx+2*d,cy-flip,'conveyor',1+fr);set(cx+2*d,cy,'conveyor',1+fr);set(cx+2*d,cy+flip,'double-turret',fr);set(cx+d,cy-3*flip,'conveyor',2*d);set(cx+2*d,cy-3*flip,'conveyor',2*d);set(cx+2*d,cy-4*flip,'conveyor',1+fr);set(cx+2*d,cy-5*flip,'conveyor',1+fr);set(cx+3*d,cy-5*flip,'stone-drill',fr);set(cx+3*d,cy-4*flip,'stone-drill',fr);set(cx+3*d,cy-3*flip,'stone-drill',fr);});
  }else{
   set(cx,cy-2,'air',0);set(cx,cy-3,'air',0);tiles.get(cx,cy-3).setFloor(block('stone-floor'));tiles.get(cx+1,cy-8).setFloor(block('iron-floor'));tiles.get(cx-1,cy-8).setFloor(block('coal-floor'));
   for(var dx=-10;dx<=10;dx++)for(var dy=-10;dy<=10;dy++){var t=tiles.get(cx+dx,cy+dy);if(t!=null&&t.block()===block('rock'))t.setBlock(Blocks.air);}
  }
  data.spawns.forEach(function(p){tiles.get(p%width,Math.floor(p/width)).setOverlay(Blocks.spawn);});
 });
 data.targets.forEach(function(p){var target=unit('target').create(Team.crux);target.set((p%width)*8,Math.floor(p/width)*8);target.add();});
 var rules=Vars.state.rules;rules.waves=entry.name!=='tutorial';rules.waveTimer=true;rules.waveSpacing=3600;rules.winWave=0;rules.spawns.clear();rules.loadout.clear();rules.loadout.add(new ItemStack(Items.copper,240));rules.unitAmmo=false;rules.dropZoneRadius=12;rules.coreDestroyClear=false;
 waves.groups.forEach(function(g){var spawn=new SpawnGroup(unit(g.type));spawn.begin=g.begin;spawn.end=g.end;spawn.spacing=g.spacing;spawn.unitAmount=g.amount;spawn.max=g.max;spawn.unitScaling=g.scaling;rules.spawns.add(spawn);});
 var cx=data.core%width,cy=Math.floor(data.core/width),core=Team.sharded.core();check(core!=null&&core.tile===Vars.world.tile(cx,cy),'Core position '+entry.name);
 var walk=reachable(cx,cy,width,height),paths=data.spawns.map(function(p){return walk.seen.get(p);});
 check(paths.every(function(ok){return ok;}),'No ground route to core '+entry.name+' '+paths);
 check(walk.ore[0]>0&&walk.ore[1]>0,'No reachable iron/coal '+entry.name);
 var expected=[];for(var y=0;y<height;y++)for(var x=0;x<width;x++){var t=Vars.world.tile(x,y);expected.push([t.floor().id,t.block().id,t.overlay().id]);}
 var tags=new StringMap();tags.put('name','MCE Classic - '+entry.name);tags.put('author','Anuken / EliasXbox (v7 port)');tags.put('description','Original Classic '+entry.name+' terrain, core, spawns and starter base. Seed '+entry.seed+'. Normal Classic wave counts/tiers mapped to v7 groups; modern AI/combat. Bootstrap: 240 vanilla copper for existing drill recipe.'+(entry.name==='tutorial'?' Practice map only; original scripted tutorial not included.':''));tags.put('rules',JsonIO.write(rules));tags.put('mce-classic-source',entry.sourceSha256);tags.put('mce-classic-seed',String(entry.seed));
 var map=Vars.maps.saveMap(tags),output=root.child('maps/classic-original-'+entry.name+'.msav');map.file.copyTo(output);
 SaveIO.load(output);check(Vars.world.width()===width&&Vars.world.height()===height,'Reload dimensions '+entry.name);check(Team.sharded.core().tile===Vars.world.tile(cx,cy),'Reload core '+entry.name);
 for(var y=0;y<height;y++)for(var x=0;x<width;x++){var t=Vars.world.tile(x,y),v=expected[y*width+x];check(t.floor().id===v[0]&&t.block().id===v[1]&&t.overlay().id===v[2],'Reload tile '+entry.name+' '+x+','+y);}
 data.spawns.forEach(function(p){check(Vars.world.tile(p%width,Math.floor(p/width)).overlay()===Blocks.spawn,'Reload spawn '+entry.name);});
 var expectedCount=waves.groups.length;check(Vars.state.rules.spawns.size===expectedCount,'Reload waves '+entry.name);check(Vars.state.rules.waves===(entry.name!=='tutorial'),'Reload waves enabled '+entry.name);
 if(entry.name!=='tutorial'){
  [1,3,4,6,17,35,86,120,500,1000,10000].forEach(function(wave){var actual=0;Vars.state.rules.spawns.each(cons(function(g){actual+=g.getSpawned(wave-1);}));var expectedCount=0;waves.definitions.forEach(function(d){if(wave<d.after||wave>d.before||(wave-d.after)%d.spacing!==0)return;var tier=Math.min(6,Math.max(1,d.tier+Math.floor((wave-d.after)/d.tierscale)));expectedCount+=Math.min(d.amount-1+Math.max(Math.floor(Math.floor(wave/d.spacing)/(d.scaling*2)),1)+(tier-1)*d.tierscaleback,d.max);});check(actual===expectedCount,'Native wave count '+entry.name+' wave '+wave+' '+actual+'/'+expectedCount);});
 }
 var item={name:entry.name,width:width,height:height,seed:entry.seed,core:[cx,cy],spawns:data.spawns.length,targets:data.targets.length,groundRoutes:paths,reachableTiles:walk.tiles,reachableOres:walk.ore,sourceOreCounts:data.oreCounts,tilesVerified:expected.length,waveGroups:expectedCount,bytes:output.length(),sha256:sha256(output)};report.push(item);print('MCE_MAP_PASS '+JSON.stringify(item));Vars.state.set(GameState.State.menu);
});
check(Blocks.coreShard.health===1100&&UnitTypes.dagger.health===150,'Vanilla changed');root.child('docs/classic-map-validation.json').writeString(JSON.stringify({maps:report,passed:report.length,vanilla:true},null,2));print('MCE_MAP_PACK_PASS maps='+report.length+' reload=allTiles paths=allSpawns ores=reachable waves=normal/infinite vanilla=ok');
})();
