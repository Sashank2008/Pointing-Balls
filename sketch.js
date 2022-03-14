const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

var ground;

var top_wall;
var ball1;
var ball2;

var btn1;
var btn2;
var chain1;
var chain2;
var chain3;
function setup() {
  createCanvas(400, 400);

  engine = Engine.create();
  world = engine.world;

  var ball_options = {
    restitution: 0.95,
  };

  btn2 = createImg("up.png");
  btn2.position(20, 30);
  btn2.size(50, 50);
  btn2.mouseClicked(vForce);

  ground = new Ground(200, 390, 400, 20);

  ball1 = Bodies.circle(100, 200, 20, ball_options);
  World.add(world, ball1);

  ball2 = Bodies.circle(160, 200, 20, ball_options);
  World.add(world, ball2);

  rectMode(CENTER);
  ellipseMode(RADIUS);

  chain1 = Constraint.create({
    length: 200,
    stiffness: 0.7,
    pointA: { x: 200, y: 20 },
    bodyB: ball1,
  });
  World.add(world, chain1);

  chain2 = Constraint.create({
    length: 100,
    stiffness: 0.7,
    bodyA: ball1,
    bodyB: ball2,
  });
  World.add(world, chain2);

  chain3 = Constraint.create({
    length: 100,
    stiffness: 0.01,
   pointA: {x: 10, y:30},
   pointB: {x: 10,y: 90}
  });
  World.add(world, chain3);
}

function draw() {
  background(51);
  Engine.update(engine);

  ellipse(ball1.position.x, ball1.position.y, 20, 20);
  ellipse(ball2.position.x, ball2.position.y, 20, 20);

  ground.show();
  push();
  stroke("red");
  strokeWeight(3);
  line(chain1.pointA.x, chain1.pointA.y, ball1.position.x, ball1.position.y);
  line(ball1.position.x, ball1.position.y, ball2.position.x, ball2.position.y);
  line(chain3.pointA.x,chain3.pointA.y,chain3.pointB.x,chain3.pointB.y);
  pop();
}

function vForce() {
  Matter.Body.applyForce(ball1, { x: 0, y: 0 }, { x: 0, y: -0.05 });
  Matter.Body.applyForce(ball2, { x: 0, y: 0 }, { x: 0, y: -0.05 });
}
