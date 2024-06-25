class Chicken extends MovableObject {
  y = 365;
  height = 60;
  width = 80;

  IMAGES_WALKING = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD_CHICKEN = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

  dead = false;

  constructor(world) {
    super().loadImage(
      "El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD_CHICKEN);
    this.world = world; // Set the world property

    this.x = 300 + Math.random() * 1500;
    this.speed = 0.15 + Math.random() * 0.25; // Chicken laufen unterschiedlich schnell
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }

  die() {
    this.dead = true;
    this.playAnimation(this.IMAGES_DEAD_CHICKEN);
    setTimeout(() => {
      this.removeFromWorld();
    }, 500); // Entfernen Sie das Huhn nach 1 Sekunde
  }

  removeFromWorld() {
    if (this.world && this.world.level) {
      const index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
      }
    }
  }
}
