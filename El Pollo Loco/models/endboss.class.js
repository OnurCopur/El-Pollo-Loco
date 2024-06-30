class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  speed = 1.5;
  health = 100;
  deadAnimationPlayed = false;
  //endboss_sound = new Audio('El Pollo Loco/audio/endboss_music.mp3');
  //won_sound = new Audio('El Pollo Loco/audio/game_won_sound.mp3'); // Add won_sound

  offset = {
    top: 90,
    bottom: 40,
    left: 35,
    right: 35
  };

  IMAGES_ALERT = [
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G12.png"
  ];

  IMAGES_ATTACK = [
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G20.png"
  ];

  IMAGES_WALKING = [
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G4.png"
  ];

  IMAGES_HURT = [
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G23.png"
  ];

  IMAGES_DEAD = [
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G26.png"
  ];

  constructor() {
    super().loadImage("El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3300;
    this.animate();

  }

  animate() {
    setInterval(() => {
      if (this.isDead() && !this.deadAnimationPlayed) {
        this.playAnimationOnce(this.IMAGES_DEAD);
        this.deadAnimationPlayed = true;
        endboss_sound.pause();
      } else if (!this.isDead()) {
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 200);

    setInterval(() => {
      if (!this.isDead() && this.world && this.world.endbossStatusBarVisible) {
          background_sound.pause();
          this.moveLeft();
          this.otherDirection = false;
      }
    }, 1000 / 60);
  }

 
  isHurt() {
    return this.health < 100 && this.health > 0;
  }

  hit() {
    this.health -= 20;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  isDead() {
    return this.health == 0;
  }

  isVisibleInCanvas() {
    const distance = this.world.character.x - this.x;
    return distance >= -500;
  }
}
