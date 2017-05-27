var State = Object.freeze({HOME: 0, ABOUT: 1, WORK: 2, PROJECTS: 3, CONTACT: 4});
var currentState = State.HOME;
var screenSize = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

function windowResized() {
  screenSize = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }
  resizeCanvas(windowWidth, windowHeight);
}

function transitionToAboutPage() {
  transitionBG(125,25,53);
  particles = [];
  currentState = State.ABOUT;
  setupAboutPage();
}

function transitionToWorkPage() {
  transitionBG(125,25,53);
  particles = [];
  currentState = State.WORK;
}

function transitionToProjectsPage() {
  transitionBG(125,25,53);
  particles = [];
  currentState = State.PROJECTS;
}

function transitionToContactPage() {
  transitionBG(125,25,53);
  particles = [];
  currentState = State.CONTACT;
}

function mousePressed() {
  switch(currentState) {
    case State.HOME:
      particles.push(new Particle(mouseX,mouseY));
      break;
    case State.ABOUT:
      circles.push(new Circle(mouseX, mouseY));
      break;
  }
}


function setup() {
  var canvas = createCanvas(screenSize.width,screenSize.height);
  canvas.parent('canvas-bg');
  for(var i = 0; i < 10; i++) {
    particles.push(new Particle(random(screenSize.width),random(screenSize.height)));
  }

}

function draw() {
  background(bg.r,bg.g,bg.b);
  switch(currentState) {
    case State.HOME:
      drawHomePage();
      break;
    case State.ABOUT:
      drawAboutPage();
      break;
  }
}
