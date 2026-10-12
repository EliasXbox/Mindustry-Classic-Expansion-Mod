var prefix='mindustry-classic-expansion-classic-';
function cons2(fn){return new Cons2({get:fn});}
var colors=['4169e1','ffa500','ff2400','228b22','a020f0','ffd700','ff69b4','292929'];
var live=[];
Events.on(WorldLoadEvent,cons(function(){live=[];}));
var tele=extend(Block,'classic-teleporter',{});
tele.update=true;tele.solid=true;tele.configurable=true;tele.saveConfig=true;tele.hasItems=true;tele.hasPower=true;tele.outputsPower=true;
tele.config(java.lang.Integer,cons2(function(b,v){}));
function links(b){return live.filter(function(o){return o!==b&&!o.dead&&o.tile!=null&&o.tile.build===o&&o.team===b.team&&Number(o.config())===Number(b.config())&&o.items.total()===0;});}
tele.buildType=prov(function(){var channel=0;return extend(Building,{
 configured:function(builder,value){channel=Math.max(0,Math.min(7,Number(value)));},
 updateTile:function(){if(live.indexOf(this)<0)live.push(this);this.dump();},
 acceptItem:function(source,item){return this.enabled&&source!=null&&source.block!==tele&&this.power.status*30>=.8&&links(this).length>0;},
 handleItem:function(source,item){if(Vars.net.client())return;var targets=links(this);if(targets.length===0||this.power.status*30<.8)return;targets[Math.floor(Math.random()*targets.length)].items.add(item,1);this.power.status=Math.max(0,this.power.status-.8/30);},
 config:function(){return new java.lang.Integer(channel);},
 buildConfiguration:function(table){var self=this;for(var i=0;i<8;i++){(function(index){table.button(String(index+1),run(function(){self.configure(new java.lang.Integer(index));})).size(42);})(i);if(i===3)table.row();}},
 draw:function(){this.super$draw();Draw.color(Color.valueOf(colors[channel]));Fill.square(this.x,this.y,1);Draw.reset();},
 write:function(w){this.super$write(w);w.b(channel);},
 read:function(r,revision){this.super$read(r,revision);channel=r.ub();},
 version:function(){return 1;}
});});
var names=['blaster','triblaster','clustergun','beam','vulcan','shockgun'];
var costs=[[],[['iron',60],['steel',80]],[['iron',300],['steel',80]],[['steel',260],['titanium',160],['dirium',120]],[['iron',100],['steel',150],['titanium',80]],[['steel',240],['titanium',160],['dirium',160]]];
var factory=extend(Block,'classic-weapon-factory',{});
factory.solid=true;factory.destructible=true;factory.configurable=true;factory.saveConfig=false;
factory.config(java.lang.Integer,cons2(function(b,v){}));
function purchase(b,player,index,bought){
 if(Vars.net.client()||player==null||index!==Math.floor(index)||index<0||index>5||player.team()!==b.team)return false;
 var old=player.unit();if(old==null||old.dead)return false;
 var type=Vars.content.unit(prefix+'player-'+names[index]),core=b.team.core();if(type==null||core==null)return false;
 var key='p:'+player.uuid(),mask=bought[key]||1;
 if((mask&(1<<index))===0){
  for(var i=0;i<costs[index].length;i++){var c=costs[index][i],it=Vars.content.item(prefix+c[0]);if(core.items.get(it)<c[1])return false;}
  for(var i=0;i<costs[index].length;i++){var c=costs[index][i];core.items.remove(Vars.content.item(prefix+c[0]),c[1]);}
 }
 var next=type.create(b.team);next.set(old.x,old.y);next.rotation=old.rotation;next.health=next.maxHealth*Math.min(1,old.health/old.maxHealth);next.stack.item=old.stack.item;next.stack.amount=old.stack.amount;next.add();player.unit(next);old.remove();
 bought[key]=mask|(1<<index);return true;
}
factory.buildType=prov(function(){var bought={};return extend(Building,{
 configured:function(builder,value){if(builder!=null&&builder.isPlayer())purchase(this,builder.getPlayer(),Number(value),bought);},
 buildConfiguration:function(table){var self=this;names.forEach(function(name,i){var price=costs[i].map(function(c){return c[1]+' '+c[0];}).join(', ');table.button(name+(price?' — '+price:' — grátis'),run(function(){self.configure(new java.lang.Integer(i));})).width(330).height(38);table.row();});},
 write:function(w){this.super$write(w);w.str(JSON.stringify(bought));},
 read:function(r,revision){this.super$read(r,revision);bought=JSON.parse(r.str());},
 version:function(){return 1;}
});});
exports.teleporter=tele;exports.factory=factory;exports.purchase=purchase;

