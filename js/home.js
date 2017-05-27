var particles = [];

function Particle(x,y) {
  this.x = x;
  this.y = y;
  this.moveX = random(-5,5);
  this.moveY = random(-5,5);
}

Particle.prototype.move = function() {
  this.x += this.moveX * 0.2;
  this.y += this.moveY * 0.2;
}

Particle.prototype.bounds = function() {
  if(this.x < 0) {
    this.x = screenSize.width;
  }
  if(this.x > screenSize.width) {
    this.x = 0;
  }
  if(this.y < 0) {
    this.y = screenSize.height;
  }
  if(this.y > screenSize.height) {
    this.y = 0;
  }
}

function drawHomePage() {
  fill(240);
  for(var i = particles.length - 1; i >= 0; i--) {
    var particle = particles[i];

    for(var j = particles.length - 1; j >= 0; j--) {
        if(i != j) {
          var particle1 = particle;
          var particle2 = particles[j];
          var distance = dist(particle1.x,particle1.y,particle2.x,particle2.y);
          if(distance < 100) {
            stroke(140 - distance,120 - distance, 200-distance);
            line(particle1.x,particle1.y,particle2.x,particle2.y);
          }
        }
    }

    particle.move();
    ellipse(particle.x, particle.y, 5);
    particle.bounds();
  }
}

console.log("works");
