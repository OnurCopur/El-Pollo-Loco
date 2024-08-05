/**
 * Represents the health status bar for the endboss.
 * Inherits from `DrawableObject` and provides functionality to display and update the endboss's health.
 */
class EndbossHealthBar extends DrawableObject {
  /**
   * The x-coordinate of the health bar's position.
   * @type {number}
   */
  x = 460;

  /**
   * The y-coordinate of the health bar's position.
   * @type {number}
   */
  y = 5;

  /**
   * The current health percentage of the endboss.
   * @type {number}
   */
  percentage = 100;

  /**
   * An array of image paths representing different states of the endboss's health status bar.
   * @type {string[]}
   */
  IMAGES_STATUSBAR_ENDBOSS = [
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
  ];

  /**
   * Constructs a new `EndbossHealthBar` instance and initializes its properties.
   * Loads the images for the endboss health status bar and sets its initial size and percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
    this.width = 250;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage of health displayed on the status bar.
   * Updates the displayed image based on the percentage.
   * @param {number} percentage - The percentage of health to be displayed (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; // 0 ... 100
    let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used based on the current percentage.
   * @returns {number} The index of the image in the `IMAGES_STATUSBAR_ENDBOSS` array.
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
