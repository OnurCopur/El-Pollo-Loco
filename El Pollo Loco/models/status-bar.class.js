/**
 * Represents a health status bar.
 * Inherits from `DrawableObject` and provides functionality to display and update the player's health status.
 */
class StatusBar extends DrawableObject {
  /**
   * An array of image paths representing different states of the health status bar.
   * @type {string[]}
   */
  IMAGES = [
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * The current health percentage displayed on the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Constructs a new `StatusBar` instance and initializes its properties.
   * Loads the images for the health status bar and sets its initial size and percentage.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = -5;
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
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used based on the current percentage.
   * @returns {number} The index of the image in the `IMAGES` array.
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
