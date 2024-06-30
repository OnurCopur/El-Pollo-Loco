class EndbossHealthBar extends DrawableObject {    
    x = 460;
    y = 5;
    percentage = 100;
    

    IMAGES_STATUSBAR_ENDBOSS = [
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'El Pollo Loco/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];


    constructor() {
        super().loadImages(this.IMAGES_STATUSBAR_ENDBOSS);
        this.width = 250;
        this.height = 50;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // 0 ... 5
        let path = this.IMAGES_STATUSBAR_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
      }

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
