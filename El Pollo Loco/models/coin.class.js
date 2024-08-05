/**
 * Represents a coin object in the game.
 * @extends MovableObject
 */
class Coin extends MovableObject {
  /**
   * The y-coordinate of the coin.
   * @type {number}
   */
  y = 365;

  /**
   * The height of the coin.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the coin.
   * @type {number}
   */
  width = 100;

  /**
   * The offset values for the coin's collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 35,
    bottom: 35,
    left: 35,
    right: 35,
  };

  /**
   * Array of image paths used for the coin's animation.
   * @type {string[]}
   */
  IMAGES_COIN = ["El Pollo Loco/img/8_coin/coin_1.png"];

  /**
   * Creates an instance of Coin, initializes its position, and starts the animation.
   */
  constructor() {
    super().loadImages(this.IMAGES_COIN);
    this.x = 300 + Math.random() * 1500; // Random x-coordinate between 300 and 1800
    this.y = 100 + Math.random() * 200; // Random y-coordinate between 100 and 300

    this.playAnimation(this.IMAGES_COIN);
  }
}
