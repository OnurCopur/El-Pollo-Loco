/**
 * Represents a level in the game.
 * Contains collections of enemies, clouds, background objects, coins, and bottles.
 */
class Level {
  /**
   * An array of enemy objects in the level.
   * @type {MovableObject[]}
   */
  enemies;

  /**
   * An array of cloud objects in the level.
   * @type {DrawableObject[]}
   */
  clouds;

  /**
   * An array of background objects in the level.
   * @type {DrawableObject[]}
   */
  backgroundObjects;

  /**
   * The x-coordinate where the level ends.
   * @type {number}
   */
  level_end_x = 3000;

  /**
   * An array of coin objects in the level.
   * @type {Coin[]}
   */
  coins;

  /**
   * An array of bottle objects in the level.
   * @type {Bottle[]}
   */
  bottles;

  /**
   * Constructs a new level with the specified arrays of enemies, clouds, background objects, coins, and bottles.
   * @param {MovableObject[]} enemies - An array of enemy objects to be included in the level.
   * @param {DrawableObject[]} clouds - An array of cloud objects to be included in the level.
   * @param {DrawableObject[]} backgroundObjects - An array of background objects to be included in the level.
   * @param {Coin[]} coins - An array of coin objects to be included in the level.
   * @param {Bottle[]} bottles - An array of bottle objects to be included in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}
