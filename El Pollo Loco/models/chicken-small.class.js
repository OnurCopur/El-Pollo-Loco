class SmallChicken extends MovableObject {
  y = 390;
  height = 60;
  width = 80;


  IMAGES_WALKING2 = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD_CHICKEN_SMALL = [
    "El Pollo Loco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];

 
  offset = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  }

  constructor() {
    super().loadImage(
      "El Pollo Loco/img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    );
    this.loadImages(this.IMAGES_WALKING2);
    this.loadImages(this.IMAGES_DEAD_CHICKEN_SMALL);

    this.x = 1000 + Math.random() * 1200;
    this.speed = 0.15 + Math.random() * 0.25; // Chicken laufen unterschiedlich schnell
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.dead) {

        this.moveLeft();
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.dead)
        this.playAnimation(this.IMAGES_WALKING2);
    }, 200);

    setInterval(() => {
      if (!this.dead)
        this.jump();
    }, 1000);
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    return this.y < 360;
  }

  jump() {
    this.speedY = 20;
  }

  die() {
    this.dead = true;
    this.speedY = 20; // Setze Geschwindigkeit für das Fallen
    this.playAnimation(this.IMAGES_DEAD_CHICKEN_SMALL);

    // Timer für das Entfernen des Huhns nach dem Fallen
    setTimeout(() => {
      this.y = 390; // Position auf dem Boden setzen
      this.removeFromWorld();
    }, 1000); // Entferne das Huhn nach 0.5 Sekunden
  }

  isDead(){
    return this.dead;
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