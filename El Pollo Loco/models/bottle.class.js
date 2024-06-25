class Bottle extends MovableObject {
  y = 340;
  height = 100;
  width = 100;
  offset = {
    top: 20,
    bottom: 0,
    left: 40,
    right: 20,
  };


  IMAGES_BOTTLE = [
    "El Pollo Loco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "El Pollo Loco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.x = 300 + Math.random() * 1700;

    this.playAnimation(this.IMAGES_BOTTLE);
  }
}
