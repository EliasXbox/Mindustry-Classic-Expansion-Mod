(function(){
function block(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function item(id){return Vars.content.item('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
Vars.world.loadGenerator(96,64,function(tiles){
 tiles.fill();for(var x=0;x<96;x++)for(var y=0;y<64;y++)tiles.get(x,y).setFloor(Blocks.stone);
 function put(x,y,id,team,rot){tiles.get(x,y).setBlock(typeof id==='string'?block(id):id,team||Team.sharded,rot||0);}
 put(10,10,Blocks.coreShard);put(14,10,'weapon-factory');
 put(20,10,'teleporter');put(70,10,'teleporter');put(50,10,'teleporter');put(70,11,'steel-conveyor',null,1);put(70,13,Blocks.vault);put(20,9,'steel-conveyor',null,1);
 put(40,30,'titanium-shield-wall');put(40,45,'shield-generator');
 put(20,40,'nuclear-reactor');put(70,40,'nuclear-reactor');put(24,40,'power-laser');put(26,40,Blocks.battery);
 put(20,25,'laser-turret');put(70,25,'tesla-turret');put(20,30,Blocks.thoriumWallLarge,Team.crux);put(70,30,Blocks.thoriumWallLarge,Team.crux);
});
var a=Vars.world.build(20,10),b=Vars.world.build(70,10),c=Vars.world.build(50,10);
a.configure(new java.lang.Integer(2));b.configure(new java.lang.Integer(2));c.configure(new java.lang.Integer(3));
var node=Vars.world.build(24,40);node.configure(new java.lang.Integer(Point2.pack(20,40)));node.configure(new java.lang.Integer(Point2.pack(26,40)));
Vars.state.rules.waves=false;Vars.state.rules.infiniteResources=false;Vars.state.rules.loadout.clear();['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(item(id),1000));});
var tags=new StringMap();tags.put('name','MCE - Special Blocks Demo');tags.put('author','EliasXbox');tags.put('description','Factory (14,10). Teleporters (20,10)/(70,10), channel 3; (50,10), channel 4. Shield wall (40,30), projector (40,45). Reactors (20,40)/(70,40) need water and uranium. Laser/Tesla at (20,25)/(70,25). Add power connections for interactive use.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-special-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
var factory=Vars.world.build(14,10),core=Team.sharded.core();['iron','steel','titanium','dirium'].forEach(function(id){core.items.add(item(id),3000);});
var player=Player.create();player.team(Team.sharded);var old=UnitTypes.alpha.create(Team.sharded);old.set(14*8,12*8);old.add();player.unit(old);
var ironBefore=core.items.get(item('iron'));factory.configured(player.unit(),new java.lang.Integer(1));
check(player.unit().type.name==='mindustry-classic-expansion-classic-player-triblaster','Weapon equip failed');check(core.items.get(item('iron'))===ironBefore-60,'Purchase cost failed');
factory.configured(player.unit(),new java.lang.Integer(1));check(core.items.get(item('iron'))===ironBefore-60,'Charged twice for unlocked weapon');
for(var i=0;i<6;i++){factory.configured(player.unit(),new java.lang.Integer(i));check(player.unit().type.name.indexOf('classic-player-')>=0,'Weapon variant equip failed');}
var sw=Vars.world.build(40,30);sw.power.status=1;sw.update();sw.damage(100);check(sw.health===600&&sw.shield===400,'Shield wall absorption failed');
var reactor=Vars.world.build(20,40),dry=Vars.world.build(70,40);reactor.items.add(item('uranium'),30);dry.items.add(item('uranium'),30);
var laser=Vars.world.build(20,25),tesla=Vars.world.build(70,25),targets=[Vars.world.build(20,30),Vars.world.build(70,30)];targets.forEach(function(t){t.health=10000;});laser.rotation=90;tesla.rotation=90;
var builds=[];for(var x=0;x<96;x++)for(var y=0;y<64;y++){var q=Vars.world.build(x,y);if(q!=null&&q.tile.x===x&&q.tile.y===y)builds.push(q);}
var projector=Vars.world.build(40,45),sent=0;Time.delta=1;Vars.state.set(GameState.State.playing);
for(var tick=0;tick<600;tick++){
 Time.update();Time.delta=1;Time.time+=1;
 reactor.liquids.add(Liquids.water,Math.max(0,50-reactor.liquids.get(Liquids.water)));
 [a,b,c,laser,tesla,projector].forEach(function(q){q.power.status=1;});laser.target=targets[0];tesla.target=targets[1];
 builds.forEach(function(q){if(!q.dead)q.update();});
 if(tick%20===0&&sent<10&&a.acceptItem(Vars.world.build(20,9),item('iron'))){a.handleItem(Vars.world.build(20,9),item('iron'));sent++;}
 reactor.power.graph.update();Groups.bullet.update();
}
check(sent===10&&Vars.world.build(70,13).items.get(item('iron'))===10,'Teleport transport failed');check(c.items.total()===0,'Cross-color teleport');
check(reactor.heat<.01&&reactor.getPowerProduction()>0,'Cooled reactor failed');check(dry.dead||Vars.world.build(70,40)==null,'Dry reactor did not overheat');
check(targets[0].health<10000&&targets[1].health<10000,'Powered turret damage failed');check(projector.realRadius()>30,'Projector did not expand');
var bullet=new BasicBulletType(0,20).create(projector,Team.crux,projector.x,projector.y,0);Groups.bullet.update();projector.update();check(!bullet.isAdded(),'Projector did not absorb');
check(UnitTypes.alpha.weapons.size>0&&Blocks.thoriumReactor.fuelItem===Items.thorium,'Vanilla unit/reactor changed');
print('MCE_BATCH8_PASS teleport=10 colors=isolated weapons=6 repeatCost=0 shield=100 reactor=cool/dry laser/tesla=damage projector=absorb');Vars.state.set(GameState.State.menu);player.unit().remove();player.remove();
})();


