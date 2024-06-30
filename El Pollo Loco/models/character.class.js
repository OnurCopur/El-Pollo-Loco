class Character extends MovableObject {
  y = 130;
  height = 300;
  speed = 10;

  IMAGES_IDLE = [
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-1.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-2.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-3.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-4.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-5.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-6.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-7.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-8.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-9.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "El Pollo Loco/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "El Pollo Loco/img/2_character_pepe/2_walk/W-21.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-22.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-23.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-24.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-25.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "El Pollo Loco/img/2_character_pepe/3_jump/J-31.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-32.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-33.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-34.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-35.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-36.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-37.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-38.png",
    "El Pollo Loco/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "El Pollo Loco/img/2_character_pepe/5_dead/D-51.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-52.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-53.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-54.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-55.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-56.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-41.png",
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-42.png",
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-43.png",
  ];

  world;
 
  lastActionTime = new Date().getTime();
  deadAnimationPlayed = false;

  offset = {
    top: 120,
    bottom: 15,
    left: 20,
    right: 20,
  };

  constructor() {
    super().loadImage("El Pollo Loco/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }



  animate() {
    setInterval(() => {
      if (!this.isDead()) { // Check if character is not dead
        let currentTime = new Date().getTime();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.moveRight();
          this.otherDirection = false;
          walking_sound.play();
          this.lastActionTime = currentTime;
        }
        if (this.world.keyboard.LEFT && this.x > -619) {
          this.moveLeft();
          this.otherDirection = true;
          walking_sound.play();
          this.lastActionTime = currentTime;
        }
        if (this.world.keyboard.UP && !this.isAboveGround()) {
          this.jump();
          jump_sound.play();
          this.lastActionTime = currentTime;
        }
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 40);

    setInterval(() => {
      let currentTime = new Date().getTime();
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        hurt_sound.play();
      } else if (this.isDead()) {
        if (!this.deadAnimationPlayed) { // Play dead animation only once
          this.playAnimation(this.IMAGES_DEAD);
          this.deadAnimationPlayed = true;
          background_sound.pause();
          gameover_sound.play();
        }
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING); // Play jumping animation
      } else {
        let idleTime = currentTime - this.lastActionTime;
        if (idleTime >= 6000) {
          this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (idleTime >= 3000) {
          this.playAnimation(this.IMAGES_IDLE);
        } else {
          if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
          }
        }
      }
    }, 200);
  }

  jump() {
    if (!this.isDead()) { // Prevent jumping if character is dead
      this.speedY = 25;
    }
  }
}
