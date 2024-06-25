class BottleBar extends DrawableObject {
  IMAGES_BOTTLE = [
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "El Pollo Loco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 30;
    this.y = 70;
    this.width = 250;
    this.height = 50;
    this.setPercentage(0);
  }

  // setPercentage(50)
  setPercentage(percentage) {
    this.percentage = percentage; // 0 ... 5
    let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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
