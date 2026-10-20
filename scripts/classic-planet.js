// Separate campaign; existing saves keep their stable content names.
var prefix='mindustry-classic-expansion-classic-', planet=new Planet('classic',Planets.sun,1,1);
planet.localizedName='Classic';planet.description='Original Classic maps and technology, adapted to v7 campaign.';
planet.alwaysUnlocked=true;planet.startSector=9;planet.allowLaunchToNumbered=false;
planet.allowLaunchSchematics=false;planet.allowLaunchLoadout=false;planet.allowWaveSimulation=false;planet.allowSectorInvasion=false;
planet.prebuildBase=false;planet.clearSectorOnLose=true;planet.allowWaves=true;
planet.iconColor=Color.valueOf('78a650');planet.atmosphereColor=Color.valueOf('56734d');
planet.generator=extend(PlanetGenerator,{
 getHeight:function(v){return 0;},getColor:function(v){return Color.valueOf(v.y>.35?'888c93':'78a650');},
 generateSector:function(s){s.generateEnemyBase=false;},addWeather:function(s,r){},getSectorSize:function(s){return 128;},
 generate:function(){throw new Error('Classic uses named original maps; numbered sectors are disabled.');}
});
planet.meshLoader=prov(function(){return new HexMesh(planet,4);});
var names=['maze','fortress','sinkhole','caves','volcano','caldera','scorch','desert','island','grassland','tundra','spiral','tutorial'];
var order=['grassland','maze','desert','caves','island','sinkhole','tundra','fortress','volcano','caldera','scorch','spiral'],presets={};
names.forEach(function(name,index){
 var preset=new SectorPreset('classic-original-'+name,planet,index);
 preset.localizedName=name.charAt(0).toUpperCase()+name.substring(1);preset.description='Original Classic '+name+' map.';
 preset.difficulty=Math.max(1,order.indexOf(name)+1)/2;preset.captureWave=name==='tutorial'?0:20+5*order.indexOf(name);
 preset.alwaysUnlocked=name==='grassland'||name==='tutorial';preset.addStartingItems=true;preset.noLighting=true;
 preset.rules=cons(function(r){r.winWave=preset.captureWave;r.waves=name!=='tutorial';r.waveTimer=true;r.initialWaveSpacing=7200;r.loadout.clear();r.loadout.add(new ItemStack(Vars.content.item(prefix+'stone'),120));var core=r.defaultTeam.core();if(core!=null){core.items.clear();core.items.add(r.loadout);}});
 presets[name]=preset;
});
function own(c){return c!=null&&String(c.name).indexOf(prefix)===0;}
var managed='mce-classic-restrictions-v1';
function restore(r){
 if(!r.tags.containsKey(managed))return;
 var old=JSON.parse(r.tags.get(managed));r.bannedBlocks.clear();r.bannedUnits.clear();
 old.blocks.forEach(function(n){var b=Vars.content.block(n);if(b!=null)r.bannedBlocks.add(b);});
 old.units.forEach(function(n){var u=Vars.content.unit(n);if(u!=null)r.bannedUnits.add(u);});
 r.blockWhitelist=old.blockWhitelist;r.unitWhitelist=old.unitWhitelist;r.tags.remove(managed);
}
function restrict(r){
 restore(r);var b=[],u=[];r.bannedBlocks.each(cons(function(c){b.push(String(c.name));}));r.bannedUnits.each(cons(function(c){u.push(String(c.name));}));
 r.tags.put(managed,JSON.stringify({blocks:b,units:u,blockWhitelist:r.blockWhitelist,unitWhitelist:r.unitWhitelist}));
 r.blockWhitelist=false;r.unitWhitelist=false;
 Vars.content.blocks().each(cons(function(c){if(!own(c))r.bannedBlocks.add(c);}));
 Vars.content.units().each(cons(function(c){if(!own(c))r.bannedUnits.add(c);}));
 r.unitAmmo=false;r.waveTeam=Team.crux;
}
planet.ruleSetter=cons(restrict);
Events.on(ContentInitEvent,cons(function(){
 var core=Vars.content.block(prefix+'core');planet.defaultCore=core;
 Vars.content.items().each(cons(function(i){if(own(i))planet.itemWhitelist.add(i);else if(!planet.hiddenItems.contains(i))planet.hiddenItems.add(i);}));
 // Keep modern research trees free of Classic branches, preserving their nodes/progress.
 var custom=[];TechTree.all.each(cons(function(n){if(own(n.content))custom.push(n);}));
 custom.forEach(function(n){if(n.parent!=null&&!own(n.parent.content)){n.parent.children.remove(n);n.parent=null;}});
 var root=new TechTree.TechNode(null,core,ItemStack.empty);root.name='Classic';root.planet=planet;TechTree.roots.add(root);planet.techTree=root;
 custom.forEach(function(n){if(n.parent==null){n.parent=root;root.children.add(n);}n.planet=planet;});
 Vars.content.items().each(cons(function(i){if(own(i)&&i.techNode==null){var n=new TechTree.TechNode(root,i,ItemStack.empty);n.planet=planet;}}));
 var previous=root;
 order.forEach(function(name){var n=new TechTree.TechNode(previous,presets[name],ItemStack.empty);n.planet=planet;if(previous!==root)n.objectives.add(new Objectives.SectorComplete(previous.content));previous=n;});
 var tutorial=new TechTree.TechNode(root,presets.tutorial,ItemStack.empty);tutorial.planet=planet;
 function depth(node,value){node.depth=value;node.children.each(cons(function(child){depth(child,value+1);}));}depth(root,0);
 // Hiding custom resources excludes Classic construction recipes on modern planets.
 [Planets.serpulo,Planets.erekir].forEach(function(p){
  Vars.content.items().each(cons(function(i){if(own(i)&&!p.hiddenItems.contains(i))p.hiddenItems.add(i);}));
  var original=p.ruleSetter;p.ruleSetter=cons(function(r){restore(r);original.get(r);});
 });
}));
Events.on(WorldLoadEvent,cons(function(){
 var r=Vars.state.rules;if(r.planet===planet)restrict(r);else restore(r);
 // Convert legacy fuel only inside Classic-owned buildings, never vanilla storage.
 var coal=Vars.content.item(prefix+'coal');Groups.build.each(cons(function(b){if(own(b.block)&&b.items!=null){var count=b.items.get(Items.coal);if(count>0){b.items.remove(Items.coal,count);b.items.add(coal,count);}}}));
}));
exports.planet=planet;exports.presets=presets;exports.restore=restore;
