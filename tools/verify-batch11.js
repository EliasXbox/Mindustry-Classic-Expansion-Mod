(function(){
function type(n){return Vars.content.unit('mindustry-classic-expansion-classic-enemy-'+n);}
function block(n){return Vars.content.block('mindustry-classic-expansion-classic-'+n);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var names=['standard','fast','rapid','flamer','tank','blast','mortar','healer','titan','emp'];
Vars.world.loadGenerator(144,96,function(tiles){tiles.fill();for(var x=0;x<144;x++)for(var y=0;y<96;y++)tiles.get(x,y).setFloor(block('grass-floor'));
 tiles.get(12,48).setBlock(block('core'),Team.sharded);tiles.get(136,48).setOverlay(Blocks.spawn);
 for(var i=0;i<10;i++)tiles.get(52,8+i*8).setBlock(Blocks.thoriumWall,Team.sharded);
});
Vars.state.rules.waves=true;Vars.state.rules.waveTimer=false;Vars.state.rules.waveSpacing=600;Vars.state.rules.spawns.clear();Vars.state.rules.loadout.clear();['stone','iron','steel','titanium','dirium','uranium'].forEach(function(n){Vars.state.rules.loadout.add(new ItemStack(Vars.content.item('mindustry-classic-expansion-classic-'+n),2000));});
names.forEach(function(n,i){var g=new SpawnGroup(type(n));g.begin=i;g.end=i;g.unitAmount=n==='healer'?2:3;g.max=3;g.unitScaling=999;Vars.state.rules.spawns.add(g);});
var tags=new StringMap();tags.put('name','MCE - Classic Enemies Demo');tags.put('author','EliasXbox');tags.put('description','Manual waves 1-10: standard, fast, rapid, flamer, tank, blast, mortar, healer, titan, emp. Spawn at right; Classic core on left. Healer-only wave is support, not a threat. No Classic tier scaling.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-enemies-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
var hp=[60,50,260,150,350,30,200,200,430,210],speed=[.44,.77,.37,.39,.28,.84,.29,.29,.30,.34];
names.forEach(function(n,i){var t=type(n);check(t.health===hp[i]&&Math.abs(t.speed-speed[i])<.0001&&!t.flying,'Stats '+n);check(t.create(Team.crux).type===t,'Entity '+n);});
var shooters=[],walls=[];names.forEach(function(n,i){var w=Vars.world.build(52,8+i*8);w.health=10000;walls.push(w);if(n==='healer')return;var u=type(n).create(Team.crux);u.set(w.x-(n==='blast'?8:20),w.y);u.rotation=0;u.add();shooters.push(u);});
Vars.state.set(GameState.State.playing);Time.delta=1;
for(var tick=0;tick<260;tick++){Time.update();Time.delta=1;Time.time+=1;shooters.forEach(function(u){if(!u.dead){var index=names.indexOf(String(u.type.name).replace('mindustry-classic-expansion-classic-enemy-','')),w=walls[index];u.aim(w.x,w.y);u.controlWeapons(true,true);for(var j=0;j<u.mounts.length;j++){u.mounts[j].shoot=true;u.mounts[j].aimX=w.x;u.mounts[j].aimY=w.y;u.type.weapons.get(j).update(u,u.mounts[j]);}}});Groups.bullet.update();}
Vars.state.set(GameState.State.menu);
Core.app.post(run(function(){try{
names.forEach(function(n,i){if(n!=='healer')check(walls[i].health<10000,'Weapon damage '+n);});
Groups.unit.clear();Groups.bullet.clear();
var healer=type('healer').create(Team.crux),ally=type('standard').create(Team.crux);healer.set(80,600);ally.set(88,600);healer.add();ally.add();ally.health=20;Vars.state.teams.updateTeamStats();
for(var tick=0;tick<30;tick++){Time.delta=1;healer.abilities[0].update(healer);}check(ally.health>20,'Healer support');
var nodeTile=Vars.world.tile(70,75);nodeTile.setBlock(Blocks.combustionGenerator,Team.sharded);var node=nodeTile.build;node.health=1000;node.items.add(Items.coal,20);node.update();node.power.graph.update();var emp=type('emp').weapons.first().bullet;var owner=type('emp').create(Team.crux);var bullet=emp.create(owner,Team.crux,node.x,node.y,0);emp.hit(bullet,node.x,node.y);check(node.health<1000,'EMP powered generator hit');bullet.remove();
SaveIO.save(new Fi('batch11-save.msav'));SaveIO.load(new Fi('batch11-save.msav'));var count=0;Groups.unit.each(cons(function(u){if(u.type===type('healer')||u.type===type('standard'))count++;}));check(count===2,'Enemy entity save/load');
check(UnitTypes.dagger.health===150&&UnitTypes.alpha.weapons.size>0,'Vanilla units changed');
print('MCE_BATCH11_PASS enemies=10 stats=tier1 weapons=9 damage=ok healer=ok emp=power save=2 vanilla=ok');Groups.unit.clear();Vars.state.set(GameState.State.menu);
}catch(e){print('MCE_BATCH11_FAIL '+e);Vars.state.set(GameState.State.menu);}}));
})();



