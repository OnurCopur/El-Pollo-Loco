/**
 * Represents a cloud object in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * The y-coordinate of the cloud.
   * @type {number}
   */
  y = 20;

  /**
   * The width of the cloud.
   * @type {number}
   */
  width = 500;

  /**
   * The height of the cloud.
   * @type {number}
   */
  height = 250;

  /**
   * Creates an instance of Cloud, initializes its position, and starts the animation.
   */
  constructor() {
    super().loadImage("El Pollo Loco/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2500; // Random x-coordinate between 0 and 2500
    this.animate();
  }

  /**
   * Starts the cloud's animation by moving it to the left at a constant speed.
   */
  animate() {
    const cloudInterval = setInterval(() => {
      this.moveLeft();
      pushInterval(cloudInterval);
    }, 1000 / 60); // 60 frames per second
  }
}
