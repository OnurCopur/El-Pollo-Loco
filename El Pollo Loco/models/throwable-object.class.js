/**
 * Represents a throwable object that can be thrown and displays a splash effect when it hits the ground.
 * Inherits from `MovableObject` and handles the animation and physics for the throwable object.
 */
class ThrowableObject extends MovableObject {
  /**
   * An array of image paths representing the rotation animation of the throwable bottle.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * An array of image paths representing the splash effect when the bottle hits the ground.
   * @type {string[]}
   */
  IMAGES_BOTTLE_SPLASH = [
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new `ThrowableObject` instance.
   * @param {number} x - The initial x-coordinate of the throwable object.
   * @param {number} y - The initial y-coordinate of the throwable object.
   * @param {string} direction - The direction in which the object is thrown ('right' or 'left').
   */
  constructor(x, y, direction) {
    super().loadImage(
      "El Pollo Loco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.direction = direction;
    this.throw();
  }

  /**
   * Initiates the throwing motion of the object.
   * The object moves horizontally and applies gravity.
   * The animation changes to the splash effect when the object hits the ground.
   */
  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.animateThrow();

    this.throwInterval = setInterval(() => {
      this.x += this.direction === 'right' ? 10 : -10;
      // Check if the bottle has hit the ground
      if (this.y >= 300) {
        this.playSplashAnimation();
        bottle_break.play(); // Assumes bottle_break is a pre-defined sound effect
        clearInterval(this.throwInterval); // Stop the bottle's horizontal movement
      }
    }, 25);
  }

  /**
   * Handles the rotation animation of the bottle while it is being thrown.
   */
  animateThrow() {
    this.throwAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 20);
  }

  /**
   * Plays the splash animation when the bottle hits the ground.
   * Stops the throw animation and starts the splash animation.
   */
  playSplashAnimation() {
    // Stop the throw animation
    clearInterval(this.throwAnimationInterval);

    // Play the splash animation
    this.splashAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    }, 50);
  }
}
