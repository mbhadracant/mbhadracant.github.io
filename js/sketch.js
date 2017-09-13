var State = Object.freeze({HOME: 0, ABOUT: 1, WORK: 2, PROJECTS: 3, CONTACT: 4});
var currentState = State.HOME;

var screenSize;

function updateScreenSize() {
  var body = document.body,
      html = document.documentElement;

  screenSize = {
    width: window.innerWidth || document.body.clientWidth,
    height: Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight, html.offsetHeight)
  }

  resizeCanvas(screenSize.width, screenSize.height);
}


function windowResized() {
  updateScreenSize();
  resizeCanvas(screenSize.width, screenSize.height);
}

function transitionToAboutPage() {
  reset();
  transitionBG(125,25,53);
  setupAboutPage();
  currentState = State.ABOUT;
  updateScreenSize();
}

function transitionToWorkPage() {
  reset();
  transitionBG(10,100,180);
  currentState = State.WORK;
  updateScreenSize();
  setupWorkPage();
}

function transitionToResumePage() {
  transitionBG(125,25,53);
  updateScreenSize();
  reset();
  currentState = State.PROJECTS;
}


function transitionToHomePage() {
  transitionBG(40,20,100);
  reset();
  updateScreenSize();
  currentState = State.HOME;
  setupHomePage();
}

function reset() {
  circles = [];
  particles = [];
  dots = [];
}

function mousePressed() {
  switch(currentState) {
    case State.HOME:
      particles.push(new Particle(mouseX,mouseY));
      break;
    case State.ABOUT:
      circles.push(new Circle(mouseX, mouseY));
      break;
    case State.WORK:
      dots.push(new Dot(mouseX, mouseY));
      break;
  }
}


function setup() {
  updateScreenSize();
  var canvas = createCanvas(screenSize.width,screenSize.height);
  canvas.parent('canvas-bg');
  setupHomePage();

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
    case State.WORK:
      drawWorkPage();
      break;
  }
}
