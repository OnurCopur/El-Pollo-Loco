/**
 * Represents a Chicken enemy in the game, extending from the MovableObject class.
 * The Chicken has states for walking and being dead, and moves left across the screen.
 */
class Chicken extends MovableObject {
  /** The y-coordinate of the Chicken. */
  y = 365;
  /** The height of the Chicken. */
  height = 60;
  /** The width of the Chicken. */
  width = 80;

  /** Array of walking images for the Chicken. */
  IMAGES_WALKING = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** Array of dead images for the Chicken. */
  IMAGES_DEAD_CHICKEN = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  /** Flag indicating whether the Chicken is dead. */
  dead = false;

  /**
   * Constructs a new Chicken instance, loading its images and setting its initial position and speed.
   */
  constructor(x) {
    super().loadImage(
      "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD_CHICKEN);
    this.x = x //300 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.25; // Chickens move at different speeds
    this.animate();
  }

  /**
   * Starts the animation loop for the Chicken, handling movement and animation frames.
   */
  animate() {
    const chickenInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);
    pushInterval(chickenInterval);

    const chickenInterval2 = setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
    pushInterval(chickenInterval2);
  }

  /**
   * Sets the Chicken's state to dead and plays the dead animation, then removes the Chicken from the world after a delay.
   */
  die() {
    this.dead = true;
    this.playAnimation(this.IMAGES_DEAD_CHICKEN);
    setTimeout(() => {
      this.removeFromWorld();
    }, 500); // Remove the chicken after 0.5 seconds
  }

  /**
   * Checks if the Chicken is dead.
   * @returns {boolean} True if the Chicken is dead, false otherwise.
   */
  isDead() {
    return this.dead;
  }

  /**
   * Removes the Chicken from the world, specifically from the level's enemies array.
   */
  removeFromWorld() {
    if (this.world && this.world.level) {
      const index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }
  }
}
