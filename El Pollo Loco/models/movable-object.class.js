class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Objects should always fall
      return true;
    } else {
      return this.y < 130;
    }
  }

  collisionFromAbove(mo) {
    // Der Charakter muss in der Luft sein
    let inAir = this.speedY < 0 && this.isAboveGround();
    // Der Feind wird im oberen Drittel getroffen
    let upperThird = this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && this.y + this.offset.top < mo.y + (mo.height / 3) + mo.offset.top;

    let rightCollision = this.x + this.width - this.offset.right > mo.x + mo.offset.left;
    let leftCollision = this.x + this.offset.left < mo.x + mo.width - mo.offset.right;

    return inAir && upperThird && rightCollision && leftCollision;
  }

  // character.isColliding(chicken);
  isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
}


hit(damage = 5) {
  this.energy -= damage;
  if (this.energy < 0) {
    this.energy = 0;
  } else {
    this.lastHit = new Date().getTime();
  }
}

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < 1;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i  = 0 % 6;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationOnce(images) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < images.length) {
        this.img = this.imageCache[images[i]];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 200);
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed; // Verringere x um 15 jedes Mal
  }

  jump() {
    this.speedY = 30;
  }

  isVisibleInCanvas() {
    // Check if the object is within the canvas view
    return this.x + this.width > 0 && this.x < this.world.canvas.width;
  }
}
