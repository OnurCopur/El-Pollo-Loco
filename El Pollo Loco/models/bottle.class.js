/**
 * Represents a bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
  /**
   * The y-coordinate of the bottle.
   * @type {number}
   */
  y = 340;

  /**
   * The height of the bottle.
   * @type {number}
   */
  height = 100;

  /**
   * The width of the bottle.
   * @type {number}
   */
  width = 100;

  /**
   * The offset values for the bottle's collision detection.
   * @type {{top: number, bottom: number, left: number, right: number}}
   */
  offset = {
    top: 20,
    bottom: 0,
    left: 40,
    right: 20,
  };

  /**
   * Array of image paths used for the bottle's animation.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "El Pollo Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "El Pollo Loco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates an instance of Bottle and initializes its properties and animations.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 300 + Math.random() * 1700;

    this.playAnimation(this.IMAGES_BOTTLE);
  }
}
