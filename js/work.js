var dots = [];

function Dot(x,y) {
  this.x = x;
  this.y = y;
  this.speed = random(1,4);
}


Dot.prototype.move = function() {
  this.x += this.speed;
}

Dot.prototype.outOfBounds = function() {
  if(this.x > screenSize.width || this.x < 0 || this.y > screenSize.height || this.y < 0) {
    return true;
  }
}

function setupWorkPage() {
  for(var i = 0; i < 50; i++) {
    var randomX = random(0, screenSize.width);
    var randomY = random(0, screenSize.height);
    dots.push(new Dot(randomX, randomY));
  }
}

function drawWorkPage() {

  stroke(168, 160, 222);
  for(var i = dots.length - 1; i >= 0; i--) {
    var x = dots[i].x;
    var y = dots[i].y;
    var length = 1;
    ellipse(x,y,1);
    dots[i].move();
    if(dots[i].outOfBounds()) {
      dots.splice(i,1);
      dots.push(new Dot(0, random(0, screenSize.height)));
    }
  }
}
