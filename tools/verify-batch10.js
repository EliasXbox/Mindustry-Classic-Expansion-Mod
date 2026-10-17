(function(){
function b(id){return Vars.content.block('mindustry-classic-expansion-classic-'+id);}
function check(ok,msg){if(!ok)throw new Error(msg);}
var names=['sand-wall','snow-wall','stone-environment-wall','blackstone-wall','grass-wall','moss-wall','shrub','rock','ice-rock','black-rock'];
var floors=['sand','snow','stone','blackstone','grass','grass','grass','stone','ice','blackstone'];
Vars.world.loadGenerator(96,64,function(tiles){tiles.fill();for(var x=0;x<96;x++)for(var y=0;y<64;y++)tiles.get(x,y).setFloor(b('stone-floor'));
 tiles.get(8,8).setBlock(b('core'),Team.sharded);
 names.forEach(function(name,i){var xx=8+(i%5)*17,yy=27+Math.floor(i/5)*20;for(var dx=-3;dx<=3;dx++)for(var dy=-3;dy<=3;dy++){tiles.get(xx+dx,yy+dy).setFloor(b(floors[i]+'-floor'));if(Math.abs(dx)<=1&&Math.abs(dy)<=1)tiles.get(xx+dx,yy+dy).setBlock(b(name));}});
});
Vars.state.rules.waves=false;Vars.state.rules.loadout.clear();['stone','iron','steel','titanium','dirium','uranium'].forEach(function(id){Vars.state.rules.loadout.add(new ItemStack(Vars.content.item('mindustry-classic-expansion-classic-'+id),1000));});
var tags=new StringMap();tags.put('name','MCE - Natural Obstacles Demo');tags.put('author','EliasXbox');tags.put('description','Top row: moss, shrub, rock, ice-rock, black-rock. Bottom: sand, snow, stone, blackstone, grass walls. Props can be removed/replaced; walls are solid except moss.');tags.put('rules',JsonIO.write(Vars.state.rules));
var map=Vars.maps.saveMap(tags),target=new Fi(typeof MCE_MAP_OUTPUT==='undefined'?'maps/classic-obstacles-demo.msav':MCE_MAP_OUTPUT);target.parent().mkdirs();map.file.copyTo(target);
names.forEach(function(name,i){var q=b(name);check(q!=null,'Missing '+name);check(q.variants===[3,3,3,3,2,0,0,2,2,1][i],'Variants '+name);check(q.solid===(i<5),'Collision '+name);check(q.breakable===(i>=6)&&q.alwaysReplace===(i>=6),'Removal '+name);check(q.requirements.length===0,'Invented construction recipe '+name);});
SaveIO.save(new Fi('batch10-save.msav'));SaveIO.load(new Fi('batch10-save.msav'));names.forEach(function(name,i){check(Vars.world.tile(8+(i%5)*17,27+Math.floor(i/5)*20).block()===b(name),'Save '+name);});
var tile=Vars.world.tile(42,47);check(tile.block()===b('rock'),'Rock fixture');tile.setBlock(Blocks.air);check(tile.block()===Blocks.air,'Prop removal');check(Blocks.stoneWall.solid&&!Blocks.stoneWall.breakable,'Vanilla obstacle changed');
print('MCE_BATCH10_PASS obstacles=10 sprites=21 collision=ok removalFlags=ok recipes=0 save=ok vanilla=ok');Vars.state.set(GameState.State.menu);
})();

