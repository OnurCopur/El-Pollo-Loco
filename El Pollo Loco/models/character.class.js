/**
 * Represents the main character in the game, extending from `MovableObject`.
 * The character has various states including idle, walking, jumping, hurt, and dead.
 */
class Character extends MovableObject {
  /** The initial y-coordinate of the character. */
  y = 130;
  /** The height of the character. */
  height = 300;
  /** The speed of the character. */
  speed = 10;

  /** An array of image paths for the idle animation. */
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

  /** An array of image paths for the long idle animation. */
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

  /** An array of image paths for the walking animation. */
  IMAGES_WALKING = [
    "El Pollo Loco/img/2_character_pepe/2_walk/W-21.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-22.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-23.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-24.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-25.png",
    "El Pollo Loco/img/2_character_pepe/2_walk/W-26.png",
  ];

  /** An array of image paths for the jumping animation. */
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

  /** An array of image paths for the dead animation. */
  IMAGES_DEAD = [
    "El Pollo Loco/img/2_character_pepe/5_dead/D-51.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-52.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-53.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-54.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-55.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-56.png",
    "El Pollo Loco/img/2_character_pepe/5_dead/D-57.png",
  ];

  /** An array of image paths for the hurt animation. */
  IMAGES_HURT = [
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-41.png",
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-42.png",
    "El Pollo Loco/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** The keyboard state for handling input. */
  keyboard;
  /** The world the character is currently in. */
  world;
  /** The timestamp of the last action performed by the character. */
  lastActionTime = new Date().getTime();
  /** Indicates if the death animation has been played. */
  deadAnimationPlayed = false;


  currentImage = 0;
  jumpingAnimationPlaying = false;

  /** The offset for collision detection. */
  offset = {
    top: 120,
    bottom: 15,
    left: 20,
    right: 20,
  };


  
  /**
   * Constructs a new `Character` instance.
   * Initializes the character's position, speed, and loads its animations.
   */
  constructor() {
    super().loadImage("El Pollo Loco/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity(); // Apply gravity to the character
    this.animate(); // Start the animation
  }


  /**
   * Starts the character's movement and animation intervals.
   */
  animate() {
    this.startMovementInterval(); // Start movement handling
    this.startTimeInterval(); // Start animation handling
  }


  /**
   * Handles the character's movement at a fixed interval.
   */
  startMovementInterval() {
    const movementIntervalId = setInterval(() => {
      if (!this.isDead()) {
        // Check if character is not dead
        let currentTime = new Date().getTime();
        this.handleMovement(currentTime); // Handle movement logic
        this.world.camera_x = -this.x + 100; // Update camera position
      }
    }, 1000 / 50);
    pushInterval(movementIntervalId); // Store the interval
  }


  /**
   * Manages the character's movement based on keyboard input.
   * @param {number} currentTime - The current time in milliseconds.
   */
  handleMovement(currentTime) {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight(); // Move right
      this.otherDirection = false; // Update direction
      walking_sound.play(); // Play walking sound
      this.lastActionTime = currentTime; // Update last action time
    }
    if (this.world.keyboard.LEFT && this.x > -619) {
      this.moveLeft(); // Move left
      this.otherDirection = true; // Update direction
      walking_sound.play(); // Play walking sound
      this.lastActionTime = currentTime; // Update last action time
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump(); // Jump if on ground
      jump_sound.play(); // Play jump sound
      this.lastActionTime = currentTime; // Update last action time
    }
  }


  /**
   * Starts the animation handling at a fixed interval.
   */
  startTimeInterval() {
    const timeIntervalId = setInterval(() => {
      let currentTime = new Date().getTime();
      this.handleAnimation(currentTime); // Handle animation logic
    }, 100);
    pushInterval(timeIntervalId); // Store the interval
  }


  /**
   * Manages the character's animation based on its state.
   * @param {number} currentTime - The current time in milliseconds.
   */
  handleAnimation(currentTime) {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT); // Play hurt animation
      hurt_sound.play(); // Play hurt sound
    } else if (this.isDead()) {
      this.handleDeathAnimation(); // Handle death animation
    } else if (this.isAboveGround()) {
      this.handleJumpingAnimation(); // Handle jumping animation
    } else {
      this.jumpingAnimationPlaying = false; // Reset the jumping animation flag
      this.handleIdleAnimation(currentTime); // Handle idle animations
    }
  }


  /**
   * Plays the jumping animation once.
   */
  handleJumpingAnimation() {
    if (!this.jumpingAnimationPlaying) {
      this.playAnimationOnce(this.IMAGES_JUMPING); // Play jumping animation once
      this.jumpingAnimationPlaying = true; // Set the flag to true
    }
  }


  /**
   * Plays the death animation if not already played.
   */
  handleDeathAnimation() {
    if (!this.deadAnimationPlayed) {
      // Play dead animation only once
      this.playAnimation(this.IMAGES_DEAD); // Play dead animation
      this.deadAnimationPlayed = true; // Mark as played
      background_sound.pause(); // Pause background sound
      gameover_sound.play(); // Play game over sound
      stopAllIntervals(); // Stop all intervals
      document.getElementById("game-over-screen").classList.remove("d-none"); // Show game over screen
    }
  }


  /**
   * Handles the idle animation based on the character's idle time.
   * @param {number} currentTime - The current time in milliseconds.
   */
  handleIdleAnimation(currentTime) {
    let idleTime = currentTime - this.lastActionTime; // Calculate idle time
    if (idleTime >= 6000) {
      this.playAnimation(this.IMAGES_LONG_IDLE); // Play long idle animation
    } else if (idleTime >= 3000) {
      this.playAnimation(this.IMAGES_IDLE); // Play idle animation
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING); // Play walking animation
      }
    }
  }


  /**
   * Makes the character jump if it is not dead.
   */
  jump() {
    if (!this.isDead()) {
      // Prevent jumping if character is dead
      this.speedY = 25; // Set jump speed
    }
  }


  /**
   * Plays an animation sequence once by cycling through the provided images.
   * The animation plays at a set interval, and stops when all images have been displayed.
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimationOnce(images) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < images.length) {
        this.img = this.imageCache[images[i]];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
}


