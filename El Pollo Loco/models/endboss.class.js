class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;

  IMAGES_WALKING = [
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super().loadImage("El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
