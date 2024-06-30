class ThrowableObject extends MovableObject {
  IMAGES_BOTTLES = [
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.throw();
  }


  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.animateThrow();

    this.throwInterval = setInterval(() => {
      this.x += 10;
      // Check if the bottle has hit the ground
      if (this.y >= 300) {
        this.playSplashAnimation();
        bottle_break.play();
        clearInterval(this.throwInterval); // Stop the bottle's horizontal movement
      }
    }, 25);
  }

  animateThrow() {
    this.throwAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 20);
  }


  playSplashAnimation() {
    // Stop the throw animation
    clearInterval(this.throwAnimationInterval);

    // Play the splash animation
    this.splashAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 50);
  }
}
