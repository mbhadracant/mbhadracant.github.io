var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;

var engine;
var world;
var circle;
var ground;
var circles = [];

function Circle(x, y) {
  var options = {restitution : 1, friction:0};
  this.forceX = random(-5,5)/1000000;
  this.forceY = random(-5,5)/1000000;
  this.r = 5;
  this.body = Bodies.circle(x,y,this.r, options);
  World.add(world, this.body);
}

Circle.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  ellipse(pos.x,pos.y,this.r*2);
}

function Ground() {
  var options = {isStatic : true, friction: 0};
  this.body = Bodies.rectangle(0,screenSize.height+25, screenSize.width*2, 50, options);
  World.add(world, this.body);
}

Ground.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  rect(pos.x, pos.y, screenSize.width, 100);
}

function setupAboutPage() {
  engine = Engine.create();
  world = engine.world;
  for(var i = 0; i < 10; i++) {
    circles.push(new Circle(random(20,screenSize.width-20), random(20, 100)));
  }
  ground = new Ground();

}

function drawAboutPage() {
  for(var i = 0; i < circles.length; i++) {
    circles[i].show();
    circles[i].body.force = {x: circles[i].forceX, y: circles[i].forceY};
  }
  ground.show();
  Engine.update(engine);
}
