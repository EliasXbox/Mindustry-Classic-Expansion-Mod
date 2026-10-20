(function(){
function check(ok,msg){if(!ok)throw new Error(msg);}
var prefix='mindustry-classic-expansion-classic-',p=Vars.content.planet(prefix.substring(0,prefix.length-1)),coal=Vars.content.item(prefix+'coal');
function own(c){return c!=null&&String(c.name).indexOf(prefix)===0;}
check(p!=null&&p.techTree!=null&&p.techTree.planet===p,'Planet/tree');check(p.defaultCore===Vars.content.block(prefix+'core'),'Default core');
check(p.getStartSector().preset.alwaysUnlocked&&p.getStartSector().preset.localizedName==='Grassland','Starting sector');
var count=0;Vars.content.blocks().each(cons(function(b){if(own(b)&&b.requirements.length>0){check(b.techNode!=null&&b.techNode.planet===p,'Classic technology '+b.name);var root=b.techNode;while(root.parent!=null)root=root.parent;check(root===p.techTree,'Detached modern tree '+b.name);count++;}}));check(count===63,'All 63 construction technologies '+count);
check(coal!==Items.coal,'Separate coal');check(Vars.content.block(prefix+'coal-floor').itemDrop===coal,'Coal drop');
check(Vars.content.block(prefix+'smelter').consumesItem(coal)&&!Vars.content.block(prefix+'smelter').consumesItem(Items.coal),'Smelter coal');
check(Vars.content.block(prefix+'stone-drill').requirements[0].item===Vars.content.item(prefix+'stone'),'No copper recipe');
var reports=[];
p.sectors.each(cons(function(s){if(s.preset==null)return;
 Vars.logic.reset();Vars.world.loadSector(s,0,false);
 check(Vars.state.rules.sector===s&&Vars.state.rules.planet===p,'Campaign identity');
 check(Team.sharded.core().block===p.defaultCore,'Classic core');check(Team.sharded.core().items.get(Items.copper)===0,'No copper stock');check(Team.sharded.core().items.get(Vars.content.item(prefix+'stone'))===120,'Stone stock');
 check(Vars.state.rules.isBanned(Blocks.mechanicalDrill)&&Vars.state.rules.isBanned(UnitTypes.dagger),'Modern content banned');check(!Vars.state.rules.isBanned(Vars.content.block(prefix+'conveyor')),'Classic construction allowed');
 check(Vars.state.rules.hiddenBuildItems.contains(Items.coal)&&!Vars.state.rules.hiddenBuildItems.contains(coal),'Classic item whitelist');
 var ores=0;for(var y=0;y<Vars.world.height();y++)for(var x=0;x<Vars.world.width();x++){var t=Vars.world.tile(x,y);check(own(t.floor()),'Foreign floor '+t.floor().name);check(t.overlay()===Blocks.air||t.overlay()===Blocks.spawn,'Foreign overlay '+t.overlay().name);if(t.floor().itemDrop!=null){check(own(t.floor().itemDrop),'Modern ore '+t.floor().itemDrop.name);ores++;}}
 check(Vars.state.rules.winWave===s.preset.captureWave,'Capture wave');check(Vars.state.rules.waves===(s.preset.captureWave>0),'Tutorial waves');
 var item={name:String(s.preset.localizedName),width:Vars.world.width(),height:Vars.world.height(),captureWave:Vars.state.rules.winWave,resourceTiles:ores};reports.push(item);print('MCE_SECTOR_PASS '+JSON.stringify(item));
}));check(reports.length===13,'Thirteen named sectors');
// Any: the engine selects sun and clears hidden items; our WorldLoad restores preexisting bans.
var rules=new Rules();rules.bannedBlocks.add(Blocks.thoriumWall);p.applyRules(rules);rules.env=Vars.defaultEnv;rules.hiddenBuildItems.clear();rules.planet=Planets.sun;Vars.state.rules=rules;Events.fire(new WorldLoadEvent());
check(rules.bannedBlocks.contains(Blocks.thoriumWall),'Preserve user ban');check(!rules.isBanned(Blocks.mechanicalDrill)&&!rules.isBanned(Vars.content.block(prefix+'conveyor')),'Any mixes blocks');check(!rules.isBanned(UnitTypes.dagger),'Any mixes units');
Planets.serpulo.applyRules(rules);check(rules.hiddenBuildItems.contains(coal)&&!rules.hiddenBuildItems.contains(Items.coal),'Serpulo separation');check(!rules.isBanned(Blocks.mechanicalDrill),'Vanilla allowed');
// Existing Classic-owned fuel stores migrate without touching adjacent vanilla storage.
Vars.logic.reset();Vars.world.loadSector(p.getStartSector(),0,false);var core=Team.sharded.core();core.items.add(Items.coal,7);Vars.world.tile(3,3).setBlock(Blocks.container,Team.sharded);var modern=Vars.world.tile(3,3).build;modern.items.add(Items.coal,9);Events.fire(new WorldLoadEvent());check(core.items.get(coal)===7&&core.items.get(Items.coal)===0,'Classic fuel migration');check(modern.items.get(Items.coal)===9,'Vanilla stock untouched');
var save=new Fi('classic-planet-verification.msav');SaveIO.write(save);Vars.logic.reset();SaveIO.load(save);check(Vars.state.rules.planet===p&&Vars.state.rules.sector===p.getStartSector(),'Campaign save/reload');check(Team.sharded.core().items.get(coal)===7,'Coal persists');
check(Blocks.coreShard.health===1100&&UnitTypes.dagger.health===150,'Vanilla unchanged');
new Fi('../mce/docs/classic-planet-validation.json').writeString(JSON.stringify({version:'0.19.0-alpha',sectors:reports,technologies:count,anyMode:true,legacyFuelMigration:true,campaignSaveReload:true,vanilla:true},null,2));
print('MCE_CLASSIC_PLANET_PASS sectors=13 research=63 classicOnly=true any=true coal=true migration=true save=true vanilla=true');Vars.state.set(GameState.State.menu);
})();
