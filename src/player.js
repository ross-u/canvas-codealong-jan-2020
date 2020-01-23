"use strict";

function Player(canvas, lives, size) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");

  this.lives = lives;
  this.size = size;

  this.x = 50;
  this.y = canvas.height / 2;

  this.direction = 0;
  this.speed = 5;
}

Player.prototype.setDirection = function(direction) {
  // +1 down  -1 up
  if (direction === "up") this.direction = -1;
  else if (direction === "down") this.direction = 1;
  else if (direction === "stop") this.direction = 0;
};

Player.prototype.didCollide = function(enemy) {
  var playerLeft = this.x;
  var playerRight = this.x + this.size;
  var playerTop = this.y;
  var playerBottom = this.y + this.size;

  var enemyLeft = enemy.x;
  var enemyRight = enemy.x + enemy.size;
  var enemyTop = enemy.y;
  var enemyBottom = enemy.y + enemy.size;

  var crossRight = enemyLeft <= playerRight && enemyRight >= playerLeft;

  var crossLeft = enemyRight >= playerLeft && enemyLeft <= playerRight;

  var crossTop = enemyBottom >= playerTop && enemyTop <= playerBottom;

  var crossBottom = enemyBottom <= playerBottom && enemyBottom >= playerTop;

  if ((crossLeft || crossRight) && (crossTop || crossBottom)) {
    return true;
  }

  return false;
};

Player.prototype.updatePosition = function() {
  this.y = this.y + this.direction * this.speed; //  + 5   - 5
};

Player.prototype.handleScreenCollision = function() {
  this.updatePosition();

  var screenTop = 0;
  var screenBottom = this.canvas.height;

  if (this.y + this.size > screenBottom) this.direction = -1;
  else if (this.y < screenTop) this.direction = 1;
};

Player.prototype.removeLife = function() {
  this.lives -= 1;
};

Player.prototype.draw = function() {
  this.ctx.fillStyle = "lightblue";

  // fillRect(x, y, width, height)
  this.ctx.fillRect(this.x, this.y, this.size, this.size);
};
