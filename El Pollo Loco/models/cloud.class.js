class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("El Pollo Loco/img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 2500; // Zahl 0 und 500
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
