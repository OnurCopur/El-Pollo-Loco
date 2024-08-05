/**
 * Represents an object that can move and interact within the game world.
 * Inherits from `DrawableObject` and includes properties and methods for movement, collision detection, and animation.
 */
class MovableObject extends DrawableObject {
  /**
   * The speed at which the object moves horizontally.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Indicates the direction of movement. If true, the object moves in the opposite direction.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The vertical speed of the object, used for gravity and jumping.
   * @type {number}
   */
  speedY = 0;

  /**
   * The rate of acceleration due to gravity.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * The energy level of the object, used for tracking health or stamina.
   * @type {number}
   */
  energy = 100;

  /**
   * The timestamp of the last hit received by the object.
   * @type {number}
   */
  lastHit = 0;

  currentImage = 0;

  /**
   * Applies gravity to the object, adjusting its vertical position and speed.
   * The object will continue to fall if it is above the ground or if its speedY is positive.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Determines if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Objects should always fall
      return true;
    } else {
      return this.y < 130;
    }
  }

  /**
   * Checks for a collision with another object from above.
   * @param {MovableObject} mo - The object to check collision against.
   * @returns {boolean} True if a collision is detected from above, false otherwise.
   */
  collisionFromAbove(mo) {
    let inAir = this.speedY < 0 && this.isAboveGround();
    let upperThird =
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.y + this.offset.top < mo.y + mo.height / 3 + mo.offset.top;

    let rightCollision =
      this.x + this.width - this.offset.right > mo.x + mo.offset.left;
    let leftCollision =
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right;

    return inAir && upperThird && rightCollision && leftCollision;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {MovableObject} mo - The object to check collision against.
   * @returns {boolean} True if a collision is detected, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy by a specified amount.
   * If energy falls below zero, it is set to zero. Updates the last hit timestamp.
   * @param {number} [damage=5] - The amount of damage to inflict. Defaults to 5.
   */
  hit(damage = 5) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead (i.e., its energy is zero).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy === 0;
  }

  /**
   * Checks if the object is currently hurt.
   * The object is considered hurt if less than one second has passed since the last hit.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
    timePassed = timePassed / 1000; // Difference in s
    return timePassed < 1;
  }

  /**
   * Plays an animation sequence by cycling through the provided images.
   * The current image is updated based on the animation index.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length; // Index for the current image
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays an animation sequence once by cycling through the provided images.
   * The animation plays at a set interval, and stops when all images have been displayed.
   * @param {string[]} images - An array of image paths for the animation.
   */
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

  /**
   * Moves the object to the right by its speed amount.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed amount.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed to a positive value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Checks if the object is visible within the canvas view.
   * @returns {boolean} True if the object is within the canvas view, false otherwise.
   */
  isVisibleInCanvas() {
    return this.x + this.width > 0 && this.x < this.world.canvas.width;
  }
}
