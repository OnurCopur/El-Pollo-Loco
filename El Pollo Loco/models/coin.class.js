class Coin extends MovableObject {
  y = 365;
  height = 100;
  width = 100;

  offset = {
    top: 35,
    bottom: 35,
    left: 35,
    right: 35,
  };

  IMAGES_COIN = ["El Pollo Loco/img/8_coin/coin_1.png"];

  constructor() {
    super().loadImages(this.IMAGES_COIN);
    this.x = 300 + Math.random() * 1500;
    this.y = 100 + Math.random() * 200;

    this.playAnimation(this.IMAGES_COIN);
  }
}
