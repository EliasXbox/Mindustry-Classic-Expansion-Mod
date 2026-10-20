(function(){
function type(n){return Vars.content.unit('mindustry-classic-expansion-classic-enemy-'+n);}
function block(n){return Vars.content.block('mindustry-classic-expansion-classic-'+n);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var names=['rapid-t4','rapid-t5','rapid-t6','flamer-t4','flamer-t5','flamer-t6','tank-t4','tank-t5','tank-t6','blast-t4'];
Vars.world.loadGenerator(160,96,function(tiles){tiles.fill();for(var x=0;x<160;x++)for(var y=0;y<96;y++)tiles.get(x,y).setFloor(block('sand-floor'));tiles.get(12,48).setBlock(block('core'),Team.sharded);tiles.get(152,48).setOverlay(Blocks.spawn);for(var i=0;i<10;i++)tiles.get(72,8+i*8).setBlock(Blocks.thoriumWall,Team.sharded);});Groups.unit.clear();
Vars.state.rules.waves=true;Vars.state.rules.waveTimer=false;Vars.state.rules.spawns.clear();Vars.state.rules.loadout.clear();['stone','iron','steel','titanium','dirium','uranium'].forEach(function(n){Vars.state.rules.loadout.add(new ItemStack(Vars.content.item('mindustry-classic-expansion-classic-'+n),2000));});
names.forEach(function(n,i){var g=new SpawnGroup(type(n));g.begin=i;g.end=i;g.unitAmount=3;g.max=3;g.unitScaling=999;Vars.state.rules.spawns.add(g);});
var tags=new StringMap();tags.put('name','MCE - Assault Enemy Tiers Demo');tags.put('author','EliasXbox');tags.put('description','Manual waves: Rapid T4/T5/T6, Flamer T4/T5/T6, Tank T4/T5/T6, Blast T4. Spawn at right; core on left. Original t3 bodies with tier-specific contours/stats; modern combat adaptations.');tags.put('rules',JsonIO.write(Vars.state.rules));var map=Vars.maps.saveMap(tags),out=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-assault-tiers-demo.msav':MCE_MAP_OUTPUT);out.parent().mkdirs();map.file.copyTo(out);
var units=[],walls=[];names.forEach(function(n,i){var split=n.split('-t'),tier=Number(split[1]),base=type(split[0]),t=type(n);check(t.health===base.health*tier&&Math.abs(t.speed-base.speed-.04*(tier-1))<.0001&&!t.flying,'Health/speed '+n);var w=t.weapons.first(),bw=base.weapons.first();
 if(split[0]==='blast'){check(w.bullet.splashDamage===210&&w.bullet.fragBullet.damage===23&&w.bullet.fragBullets===30&&w.bullet.rangeOverride===10,'Blast special scaling');}
 else{check(t.range===base.range+5*(tier-1)&&Math.abs(w.reload-bw.reload/Math.max(tier/1.5,1))<.001&&w.bullet.damage===bw.bullet.damage*tier,'Weapon scaling '+n);if(split[0]==='tank')check(w.shoot.shots===4,'Tank volley');}
 var wall=Vars.world.build(72,8+i*8);wall.health=10000;walls.push(wall);var u=t.create(Team.crux);u.set(wall.x-(split[0]==='blast'?8:20),wall.y);u.rotation=0;u.add();units.push(u);
});
Vars.state.set(GameState.State.playing);for(var tick=0;tick<260;tick++){Time.delta=1;Time.update();units.forEach(function(u,i){if(!u.dead){var w=walls[i];u.aim(w.x,w.y);u.controlWeapons(true,true);u.mounts[0].shoot=true;u.mounts[0].aimX=w.x;u.mounts[0].aimY=w.y;u.type.weapons.first().update(u,u.mounts[0]);}});Groups.bullet.update();}Vars.state.set(GameState.State.menu);
Core.app.post(run(function(){try{
 walls.forEach(function(w,i){check(w.health<10000,'Weapon damage '+names[i]);});check(units[9].dead,'Blast suicide');Groups.unit.clear();Groups.bullet.clear();
 names.forEach(function(n,i){var u=type(n).create(Team.crux);u.set(100+i*32,600);u.add();});SaveIO.save(new Fi('batch15-save.msav'));SaveIO.load(new Fi('batch15-save.msav'));var found={};Groups.unit.each(cons(function(u){var n=String(u.type.name).replace('mindustry-classic-expansion-classic-enemy-','');if(names.indexOf(n)>=0)found[n]=(found[n]||0)+1;}));names.forEach(function(n){check(found[n]===1,'Saved tier '+n);});
 check(UnitTypes.dagger.health===150&&UnitTypes.alpha.weapons.size>0,'Vanilla units changed');print('MCE_BATCH15_PASS variants=10 weapons=10 stats=ok blast=210/23/suicide save=10 vanilla=ok');Groups.unit.clear();Vars.state.set(GameState.State.menu);
}catch(e){print('MCE_BATCH15_FAIL '+e);Vars.state.set(GameState.State.menu);}}));
})();
