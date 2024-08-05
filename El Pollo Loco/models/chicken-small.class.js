/**
 * Represents a small chicken enemy in the game, extending from `MovableObject`.
 * The chicken has animations for walking and dying, as well as mechanics for movement and jumping.
 */
class SmallChicken extends MovableObject {
  /** The initial y-coordinate of the chicken. */
  y = 390;
  /** The height of the chicken. */
  height = 60;
  /** The width of the chicken. */
  width = 80;

  /** An array of image paths for the walking animation. */
  IMAGES_WALKING2 = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** An array of image paths for the dead chicken animation. */
  IMAGES_DEAD_CHICKEN_SMALL = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];

  /** The offset for collision detection. */
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  /**
   * Constructs a new `SmallChicken` instance.
   * Initializes the chicken's position, speed, and loads its animations.
   */
  constructor(x) {
    super().loadImage(
      "El Pollo Loco/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    );
    this.loadImages(this.IMAGES_WALKING2);
    this.loadImages(this.IMAGES_DEAD_CHICKEN_SMALL);

    this.x = x//1000 + Math.random() * 1200; // Random x position
    this.speed = 0.15 + Math.random() * 0.25; // Random speed
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the chicken's movement, animations, and jump mechanics.
   */
  animate() {
    this.startSmallChickenInterval();
    this.startSmallChickenAnimationInterval();
    this.startSmallChickenJumpInterval();
  }

  /**
   * Handles the movement of the small chicken.
   * The chicken moves left if not dead.
   */
  startSmallChickenInterval() {
    const smallChickenInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft(); // Move left
        this.otherDirection = false; // Set direction
      }
      pushInterval(smallChickenInterval); // Store the interval
    }, 1000 / 60);
  }

  /**
   * Handles the walking animation of the small chicken.
   */
  startSmallChickenAnimationInterval() {
    const smallChickenInterval2 = setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING2); // Play walking animation
      }
      pushInterval(smallChickenInterval2); // Store the interval
    }, 200);
  }

  /**
   * Handles the jumping mechanic of the small chicken.
   */
  startSmallChickenJumpInterval() {
    const smallChickenInterval3 = setInterval(() => {
      if (!this.dead) {
        this.jump(); // Make the chicken jump
      }
      pushInterval(smallChickenInterval3); // Store the interval
    }, 1000);
  }

  /**
   * Applies gravity to the small chicken, controlling its vertical movement.
   */
  applyGravity() {
    const smallChickenInterval4 = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; // Move the chicken upwards
        this.speedY -= this.acceleration; // Reduce speed to simulate gravity
      }
      pushInterval(smallChickenInterval4); // Store the interval
    }, 1000 / 30);
  }

  /**
   * Checks if the small chicken is above ground.
   * @returns {boolean} True if the chicken is above the ground level, false otherwise.
   */
  isAboveGround() {
    return this.y < 360; // Check if above ground
  }

  /**
   * Makes the small chicken jump.
   */
  jump() {
    this.speedY = 20; // Set jump speed
  }

  /**
   * Handles the death of the small chicken.
   * Plays the death animation and removes the chicken from the world after a delay.
   */
  die() {
    this.dead = true; // Mark the chicken as dead
    this.speedY = 20; // Set speed for falling
    this.playAnimation(this.IMAGES_DEAD_CHICKEN_SMALL); // Play death animation

    // Timer to remove the chicken after falling
    setTimeout(() => {
      this.y = 390; // Reset position to the ground
      this.removeFromWorld(); // Remove chicken from the world
    }, 1000); // Remove after 1 second
  }

  /**
   * Checks if the small chicken is dead.
   * @returns {boolean} True if the chicken is dead, false otherwise.
   */
  isDead() {
    return this.dead; // Check dead status
  }

  /**
   * Removes the small chicken from the world.
   * This also updates the enemy list in the current level.
   */
  removeFromWorld() {
    if (this.world && this.world.level) {
      const index = this.world.level.enemies.indexOf(this); // Find index
      if (index > -1) {
        this.world.level.enemies.splice(index, 1); // Remove from enemies list
      }
    }
  }
}
