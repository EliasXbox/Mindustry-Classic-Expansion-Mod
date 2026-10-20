(function(){
function check(ok,message){if(!ok)throw new Error(message);}
var mod=Vars.mods.getMod('mindustry-classic-expansion');check(mod!=null,'Mod missing');check(String(mod.meta.version)==='0.19.0-alpha','ZIP version');
var inventory=JSON.parse(mod.root.child('docs').child('classic-map-inventory.json').readString()),passed=0;
inventory.maps.forEach(function(entry){
 Vars.logic.reset();SaveIO.load(mod.root.child('maps').child('classic-original-'+entry.name+'.msav'));
 var data=JSON.parse(mod.root.child('map-source').child(entry.name+'.json').readString());
 check(Vars.world.width()===data.width&&Vars.world.height()===data.height,'Dimensions '+entry.name);
 check(Team.sharded.core()!=null&&Team.sharded.core().tile.pos()===Point2.pack(data.core%data.width,Math.floor(data.core/data.width)),'Core '+entry.name);
 check(Vars.state.rules.spawns.size===152,'Wave groups '+entry.name);check(Vars.state.rules.waves===(entry.name!=='tutorial'),'Wave toggle '+entry.name);
 data.spawns.forEach(function(p){check(Vars.world.tile(p%data.width,Math.floor(p/data.width)).overlay()===Blocks.spawn,'Spawn marker');});
 // Invoke native creation for the first wave, checking the post-load spawner.
 Vars.state.wave=1;Vars.spawner.spawnEnemies();
 passed++;print('MCE_ZIP_MAP_PASS '+entry.name);
});
check(Blocks.coreShard.health===1100&&UnitTypes.dagger.health===150,'Vanilla');
print('MCE_ZIP_MAP_PACK_PASS maps='+passed+' version='+mod.meta.version+' vanilla=ok');Vars.state.set(GameState.State.menu);
})();
