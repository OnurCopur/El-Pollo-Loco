/**
 * Represents a status bar that displays the amount of bottles available.
 * Inherits from `DrawableObject` and provides functionality to update and display the status of bottles.
 */
class BottleBar extends DrawableObject {
  /**
   * An array of image paths representing different states of the bottle status bar.
   * @type {string[]}
   */
  IMAGES_BOTTLE = [
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * The current percentage of bottles displayed on the status bar.
   * @type {number}
   */
  percentage = 0;

  /**
   * Constructs a new `BottleBar` instance and initializes its properties.
   * Loads the images for the bottle status bar and sets its initial position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 30;
    this.y = 70;
    this.width = 250;
    this.height = 50;
    this.setPercentage(0);
  }

  /**
   * Sets the percentage of bottles displayed on the status bar.
   * Updates the displayed image based on the percentage.
   * @param {number} percentage - The percentage of bottles to be displayed (0 to 100).
   */
  setPercentage(percentage) {
    this.percentage = percentage; // 0 ... 100
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to be used based on the current percentage.
   * @returns {number} The index of the image in the `IMAGES_BOTTLE` array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
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
