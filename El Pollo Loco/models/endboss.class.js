/**
 * Represents the Endboss character in the game, extending from the MovableObject class.
 * The Endboss has various states and animations, including alert, attack, walking, hurt, and dead.
 */
class Endboss extends MovableObject {
  /** The height of the Endboss. */
  height = 400;
  /** The width of the Endboss. */
  width = 250;
  /** The y-coordinate of the Endboss. */
  y = 60;
  /** The speed at which the Endboss moves. */
  speed = 3.5;
  /** The health of the Endboss. */
  health = 100;
  /** Flag indicating whether the dead animation has been played. */
  deadAnimationPlayed = false;

  /** Offset for collision detection. */
  offset = {
    top: 90,
    bottom: 40,
    left: 35,
    right: 35,
  };

  /** Array of alert images for the Endboss. */
  IMAGES_ALERT = [
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G6.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G7.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G8.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G9.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G10.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G11.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /** Array of attack images for the Endboss. */
  IMAGES_ATTACK = [
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G13.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G14.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G15.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G16.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G17.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G18.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G19.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /** Array of walking images for the Endboss. */
  IMAGES_WALKING = [
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G1.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G2.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G3.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /** Array of hurt images for the Endboss. */
  IMAGES_HURT = [
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** Array of dead images for the Endboss. */
  IMAGES_DEAD = [
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G24.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G25.png",
    "El Pollo Loco/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Constructs a new Endboss instance, loading its images and starting its animations.
   */
  constructor() {
    super().loadImage("El Pollo Loco/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3000;
    this.animate();
  }

  /**
   * Starts the animation loop for the Endboss.
   */
  animate() {
    this.startEndbossInterval();
    this.startEndbossDeadInterval();
  }

  /**
   * Starts the interval for managing the Endboss's animations and states.
   */
  startEndbossInterval() {
    const endbossInterval = setInterval(() => {
      if (this.isDead() && !this.deadAnimationPlayed) {
        this.playAnimationOnce(this.IMAGES_DEAD);
        this.deadAnimationPlayed = true;
        endboss_sound.pause();
        stopAllIntervals();
        document.getElementById("win-screen").classList.remove("d-none");
      } else if (!this.isDead()) {
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 200);
    pushInterval(endbossInterval);
  }

  /**
   * Starts the interval for managing the Endboss's movement when it is not dead.
   */
  startEndbossDeadInterval() {
    const endbossDeadIntervall = setInterval(() => {
      if (!this.isDead() && this.world && this.world.endbossStatusBarVisible) {
        background_sound.pause();
        this.followCharacter();
      }
    }, 1000 / 60);
    pushInterval(endbossDeadIntervall);
  }

  /**
   * Makes the Endboss follow the character by moving left or right.
   */
  followCharacter() {
    const distance = this.x - this.world.character.x;
    if (distance > 0) {
      this.moveLeft();
      this.otherDirection = false;
    } else {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Checks if the Endboss is hurt (health is below 100 but above 0).
   * @returns {boolean} True if the Endboss is hurt, false otherwise.
   */
  isHurt() {
    return this.health < 100 && this.health > 0;
  }

  /**
   * Reduces the Endboss's health by 20 and ensures it does not go below 0.
   */
  hit() {
    this.health -= 20;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  /**
   * Checks if the Endboss is dead (health is 0).
   * @returns {boolean} True if the Endboss is dead, false otherwise.
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Checks if the Endboss is visible in the canvas based on the character's position.
   * @returns {boolean} True if the Endboss is visible, false otherwise.
   */
  isVisibleInCanvas() {
    if (this.world && this.world.character) {
      const distance = this.world.character.x - this.x;
      return distance >= -700;
    }
    return false;
  }
}
