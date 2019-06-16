var canvas = document.getElementById("canvas");
canvas.bgcolor = "#042B51";
// canvas.bgcolor = "#ffffff";
var c = canvas.getContext("2d");

canvas.adjustDimensions = function(width = 100, height = 100) {
  this.width = width;
  this.height = height;
};
canvas.adjustDimensions(window.innerWidth, window.innerHeight);

c.backRect = function() {
  this.save();
  this.fillStyle = canvas.bgcolor;
  this.fillRect(0, 0, canvas.width, canvas.height);
  this.restore();
};

// CLASS DEFINITIONS

class Star {
  constructor(x, y, colour, brightness, d = 30, intense_speed = 7) {
    this.center = {
      x,
      y
    };
    this.d = d;

    this.alpha = brightness;
    this.colour = colour;
    this.intense_speed = intense_speed;
  }
  draw() {
    c.save();
    c.fillStyle = parseColor(this.colour, this.alpha, canvas.bgcolor);
    c.beginPath();

    c.arc(
      this.center.x - this.d,
      this.center.y - this.d,
      this.d,
      0,
      Math.PI / 2
    );

    c.arc(
      this.center.x - this.d,
      this.center.y + this.d,
      this.d,
      (3 * Math.PI) / 2,
      0
    );

    c.arc(
      this.center.x + this.d,
      this.center.y + this.d,
      this.d,
      Math.PI,
      (3 * Math.PI) / 2
    );

    c.arc(
      this.center.x + this.d,
      this.center.y - this.d,
      this.d,
      Math.PI / 2,
      Math.PI
    );

    c.fill();
    c.closePath();
    c.restore();
  }

  intensify() {
    if (this.alpha > 255 || this.alpha < 1) {
      this.intense_speed = -this.intense_speed;
      if (this.alpha < 1) {
        this.center.x = Math.floor(Math.random() * canvas.width);
        this.center.y = Math.floor(Math.random() * canvas.height);
        this.alpha = Math.floor(100 * Math.random());
        if (Math.random() > 0.8) {
          this.colour = "#ffffff";
          this.intense_speed = 1;
        } else {
          this.colour = "#E5E383";
          this.intense_speed = 7;
        }
      }
      // console.log("speed flag");
    }
    this.alpha += this.intense_speed;
    // console.log(this.alpha);
  }
}

class Asteroid {
  constructor(
    x,
    y,
    x_speed,
    y_speed,
    length = 5,
    color = "#ffffff",
    rate_of_br = 5
  ) {
    this.initial = { x, y, alpha: 255 };
    this.x_speed = x_speed;
    this.y_speed = y_speed;
    this.length = length;

    this.color = color;
    this.alpha = rate_of_br;
    this.brush = this.initial;
    this.direction = Math.abs(
      this.y_speed / (this.x_speed == 0 ? 0.0001 : this.x_speed)
    );

    // this.direction = 0;
  }

  intensify() {
    if (this.brush.alpha > 255 || this.brush.alpha < 0) {
      this.alpha = -this.alpha;
      if (this.brush.alpha < 0) {
        if (!star_flag) {
          star_flag = true;
          asteroid_array = asteroid_array.slice(1, 5);
        }
        this.initial = {
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          alpha: 10
        };
        this.brush = this.initial;
        this.x_speed = -5 + Math.floor(10 * Math.random());
        this.y_speed = -5 + Math.floor(10 * Math.random());
        this.direction = Math.abs(
          this.y_speed / (this.x_speed == 0 ? 0.0001 : this.x_speed)
        );
        this.y_speed / (this.x_speed == 0 ? 0.0001 : this.x_speed);
        this.alpha = 0 + Math.floor(5 * Math.random());
        this.length = 25 + Math.floor(25 * Math.random());
        this.color = "#F18E0F";
      }
    }
    this.brush.alpha += this.alpha;
  }

  draw() {
    c.save();
    c.strokeStyle = parseColor(this.color, this.brush.alpha, canvas.bgcolor);
    this.y_speed == 0 ? (this.y_speed = 0.001) : this.y_speed;
    this.x_speed == 0 ? (this.x_speed = 0.001) : this.x_speed;
    c.beginPath();
    c.moveTo(this.brush.x, this.brush.y);
    c.lineTo(
      this.brush.x +
        (this.x_speed / Math.abs(this.x_speed)) *
          this.length *
          Math.cos(Math.atan(this.direction)),
      this.brush.y +
        (this.y_speed / Math.abs(this.y_speed)) *
          this.length *
          Math.sin(Math.atan(this.direction))
    );

    c.stroke();
    c.closePath();

    this.brush.x += this.x_speed;
    this.brush.y += this.y_speed;

    c.restore();
  }
}
// GLOBALS
var star_array = [];
var no_of_stars = 100;
var star_flag = false;
var transition_alpha = 0;
for (i = 0; i < no_of_stars; i++) {
  star_array.push(
    new Star(
      Math.floor(Math.random() * canvas.width),
      Math.floor(Math.random() * canvas.height),
      "#E5E383",
      10,
      8,
      5
    )
  );
}

var asteroid_array = [];
var no_of_asteroids = 40;
for (i = 0; i < no_of_asteroids; i++) {
  asteroid_array.push(
    new Asteroid(
      canvas.width / 2,
      canvas.height / 2,
      8 * Math.cos(i * ((2 * Math.PI) / no_of_asteroids)),

      8 * Math.sin(i * ((2 * Math.PI) / no_of_asteroids)),
      100,
      "#ffffff",
      1
    )
  );
}

//EVENT LISTENERS HERE
window.addEventListener("resize", function() {
  canvas.adjustDimensions(window.innerWidth, window.innerHeight);
});

// DRIVER COODE
function draw() {
  if (transition_alpha > 255) transition_alpha = 255;
  if (transition_alpha < 0) transition_alpha = 0;
  canvas.bgcolor = parseColor("#042B51", transition_alpha++, "#000000");
  window.requestAnimationFrame(draw);
  c.backRect();

  star_array.forEach(ele => {
    if (star_flag) {
      ele.draw();
      ele.intensify();
    }
  });
  asteroid_array.forEach(ele => {
    ele.draw();
    ele.intensify();
  });
}

draw();
