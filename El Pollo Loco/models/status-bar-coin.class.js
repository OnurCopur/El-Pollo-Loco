/**
 * Represents a status bar that displays the amount of coins collected.
 * Inherits from `DrawableObject` and provides functionality to update and display the coin count.
 */
class CoinBar extends DrawableObject {
  /**
   * An array of image paths representing different states of the coin status bar.
   * @type {string[]}
   */
  IMAGES_COIN = [
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * The current percentage of coins displayed on the status bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructs a new `CoinBar` instance and initializes its properties.
   * Loads the images for the coin status bar and sets its initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.x = 30;
    this.y = 30;
    this.width = 250;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of coins displayed on the status bar.
   * Updates the displayed image based on the percentage.
   * @param {number} percentage - The percentage of coins to be displayed (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; // 0 ... 100
    let path = this.IMAGES_COIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used based on the current percentage.
   * @returns {number} The index of the image in the `IMAGES_COIN` array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
