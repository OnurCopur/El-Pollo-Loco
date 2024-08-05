class World {
  character = new Character();
  endboss = new Endboss();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  endbossHealthBar = new EndbossHealthBar();
  endbossStatusBarVisible = false;
  coins = [];
  throwableObjects = [];
  bottles = [];
  initialBottleCount = this.level.bottles.length;
  lastThrowTime = 0;


  /**
   * Constructs a new `World` instance.
   * @param {HTMLCanvasElement} canvas - The canvas element to draw the game on.
   * @param {Keyboard} keyboard - The keyboard object for handling input.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d"); // Get the 2D rendering context
    this.canvas = canvas; // Store the canvas reference
    this.keyboard = keyboard; // Store the keyboard reference
    this.draw(); // Start the drawing loop
    this.setWorld(); // Set the world reference in the character
    this.run(); // Start the game loop
    this.initializeEnemies(); // Initialize the enemies (including chickens)
    this.endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss); // Find the end boss in the level
  }


  /**
   * Sets the world property in the character.
   */
  setWorld() {
    this.character.world = this; // Set the world reference in the character
  }


  /**
   * Initializes all enemies in the level by setting their world property.
   */
  initializeEnemies() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this; // Set the world property for each enemy
    });
  }


  /**
   * Checks the visibility of the end boss and plays sound if it becomes visible.
   */
  checkEndbossVisibility() {
    const distance = this.endboss.x - this.character.x; // Calculate distance to the end boss
    if (distance <= 500 && !this.endbossStatusBarVisible) {
      this.endbossStatusBarVisible = true; // Make the end boss status bar visible
      endboss_sound.play(); // Play end boss sound
    }
  }


  /**
   * Starts the main game loop.
   */
  run() {
    let intervals = setInterval(() => {
      this.checkCollisions(); // Check for collisions
      this.checkThrowObjects(); // Check if throwable objects are used
      this.checkEndbossVisibility(); // Check Endboss visibility every interval
    }, 50);
    pushInterval(intervals); // Store the interval for later management
  }


  /**
   * Checks if the character is throwing objects and handles throwing logic.
   */
  checkThrowObjects() {
    const currentTime = new Date().getTime();
    const timeSinceLastThrow = currentTime - this.lastThrowTime;

    if (this.keyboard.SPACE  && timeSinceLastThrow >= 500) {
      if (this.bottles.length > 0) {
        throw_sound.play(); // Play throwing sound
        let direction = this.character.otherDirection ? "left" : "right"; // Determine throwing direction
        let bottle = new ThrowableObject(
          this.character.x + (direction === "right" ? 50 : -10),
          this.character.y + 100,
          direction
        ); // Create a new throwable object
        this.throwableObjects.push(bottle); // Add the bottle to the array of throwable objects
        this.bottles.pop(); // Remove a bottle from the collected bottles
        this.updateBottleBar(); // Update the bottle bar

        this.lastThrowTime = currentTime; // Update the last throw time
      }
    }
  }


  /**
   * Checks for collisions between the character and other objects.
   */
  checkCollisions() {
    this.checkEnemyCollisions(); // Check for enemy collisions
    this.checkCoinCollisions(); // Check for coin collisions
    this.checkBottleCollisions(); // Check for bottle collisions
    this.checkThrowableObjectCollisions(); // Check for collisions with throwable objects
  }


  /**
   * Checks for collisions between the character and enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (
        !enemy.isDead() &&
        this.character.isColliding(enemy) &&
        !this.character.isHurt()
      ) {
        this.handleEnemyCollision(enemy); // Handle collision with enemy
      }
    });
  }


  /**
   * Handles the collision between the character and an enemy.
   * @param {Enemy} enemy - The enemy that the character collided with.
   */
  handleEnemyCollision(enemy) {
    if (this.character.collisionFromAbove(enemy)) {
      chicken_dead_sound.play(); // Play sound when chicken dies
      enemy.die(); // Make the enemy die
    } else {
      this.handleDamageFromEnemy(enemy); // Handle damage from enemy
    }
  }


  /**
   * Handles damage taken by the character from an enemy.
   * @param {Enemy} enemy - The enemy that is causing damage.
   */
  handleDamageFromEnemy(enemy) {
    if (enemy instanceof Endboss) {
      this.character.hit(20); // Reduce 20 health if collided with Endboss
      if (this.character.energy == 0) {
        endboss_sound.pause(); // Pause end boss sound if character is dead
      }
    } else if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
      this.character.hit(10); // Reduce 10 health if collided with Chicken or SmallChicken
    }
    this.statusBar.setPercentage(this.character.energy); // Update status bar
  }


  /**
   * Checks for collisions between the character and coins.
   */
  checkCoinCollisions() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin, index); // Collect the coin if collided
      }
    });
  }


  /**
   * Collects a coin and updates the coin bar.
   * @param {Coin} coin - The coin that was collected.
   * @param {number} index - The index of the coin in the level.
   */
  collectCoin(coin, index) {
    coin_sound.play(); // Play coin sound
    this.level.coins.splice(index, 1); // Remove the coin from the array
    this.coins.push(coin); // Add the coin to the collected coins array
    this.updateCoinBar(); // Update the coin bar
  }


  /**
   * Checks for collisions between the character and bottles.
   */
  checkBottleCollisions() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottle(bottle, index); // Collect the bottle if collided
      }
    });
  }


  /**
   * Collects a bottle and updates the bottle bar.
   * @param {Bottle} bottle - The bottle that was collected.
   * @param {number} index - The index of the bottle in the level.
   */
  collectBottle(bottle, index) {
    bottle_sound.play(); // Play bottle sound
    this.level.bottles.splice(index, 1); // Remove the bottle from the array
    this.bottles.push(bottle); // Add the bottle to the collected bottles array
    this.updateBottleBar(); // Update the bottle bar
  }


  /**
   * Checks for collisions between throwable objects and enemies or the end boss.
   */
  checkThrowableObjectCollisions() {
    this.throwableObjects.forEach((throwableObject, throwableIndex) => {
      this.checkThrowableAgainstEnemies(throwableObject, throwableIndex); // Check collisions with enemies
      this.checkThrowableAgainstEndboss(throwableObject, throwableIndex); // Check collisions with end boss
    });
  }


  /**
   * Checks if a throwable object collides with enemies.
   * @param {ThrowableObject} throwableObject - The throwable object.
   * @param {number} throwableIndex - The index of the throwable object in the array.
   */
  checkThrowableAgainstEnemies(throwableObject, throwableIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (!enemy.isDead() && throwableObject.isColliding(enemy)) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
          bottle_break.play(); // Play bottle break sound
          enemy.die(); // Make the enemy die if it is a Chicken or SmallChicken
          this.throwableObjects.splice(throwableIndex, 1); // Remove the throwable object from the array
        }
      }
    });
  }


  /**
   * Checks if a throwable object collides with the end boss.
   * @param {ThrowableObject} throwableObject - The throwable object.
   * @param {number} throwableIndex - The index of the throwable object in the array.
   */
  checkThrowableAgainstEndboss(throwableObject, throwableIndex) {
    if (!this.endboss.isDead() && throwableObject.isColliding(this.endboss)) {
      bottle_break.play(); // Play bottle break sound
      this.endboss.hit(); // Reduce Endboss health
      this.throwableObjects.splice(throwableIndex, 1); // Remove the throwable object from the array
      this.updateEndbossHealthBar(); // Update the Endboss health bar
    }
    if (this.endboss.isDead()) {
      won_sound.play(); // Play sound when the end boss is defeated
    }
  }


  /**
   * Updates the Endboss health bar based on the Endboss's health.
   */
  updateEndbossHealthBar() {
    const percentage = (this.endboss.health / 100) * 100; // Calculate health percentage
    this.endbossHealthBar.setPercentage(percentage); // Update health bar
  }

  /**
   * Updates the coin bar based on the number of collected coins.
   */
  updateCoinBar() {
    const totalCoins = this.level.coins.length + this.coins.length; // Total coins in the level
    const collectedCoins = this.coins.length; // Coins collected by the player
    const percentage = (collectedCoins / totalCoins) * 100; // Calculate percentage of collected coins
    this.coinBar.setPercentage(percentage); // Update coin bar
  }


  /**
   * Updates the bottle bar based on the number of collected bottles.
   */
  updateBottleBar() {
    const collectedBottles = this.bottles.length; // Bottles collected by the player
    const percentage = (collectedBottles / this.initialBottleCount) * 100; // Calculate percentage of collected bottles
    this.bottleBar.setPercentage(percentage); // Update bottle bar
  }


  /**
   * Draws all elements of the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas

    this.ctx.translate(this.camera_x, 0); // Translate the canvas based on the camera position
    this.addObjectsToMap(this.level.backgroundObjects); // Draw background objects
    this.addObjectsToMap(this.level.clouds); // Draw clouds

    this.ctx.translate(-this.camera_x, 0); // Reset translation
    // -------------Space for fixed objects ----------
    this.addToMap(this.statusBar); // Draw the status bar
    this.addToMap(this.coinBar); // Draw the coin bar
    this.addToMap(this.bottleBar); // Draw the bottle bar
    if (this.endbossStatusBarVisible) {
      this.addToMap(this.endbossHealthBar); // Add Endboss health bar only when visible
    }
    this.ctx.translate(this.camera_x, 0); // Translate again

    this.addObjectsToMap(this.level.coins); // Draw coins
    this.addObjectsToMap(this.level.bottles); // Draw bottles
    this.addObjectsToMap(this.throwableObjects); // Draw throwable objects
    this.addObjectsToMap(this.level.enemies); // Draw enemies
    this.addToMap(this.character); // Draw the main character

    this.ctx.translate(-this.camera_x, 0); // Reset translation

    // Call draw() again for the next frame
    let self = this;
    requestAnimationFrame(function () {
      self.draw(); // Request the next animation frame
    });
  }


  /**
   * Adds multiple objects to the map for drawing.
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o); // Add each object to the map
    });
  }


  /**
   * Adds a single object to the map for drawing.
   * @param {GameObject} mo - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo); // Flip image if facing the other direction
    }
    mo.draw(this.ctx); // Draw the object
    mo.drawFrame(this.ctx); // Draw the object's frame
    mo.drawOffsetFrame(this.ctx, mo); // Draw the object's offset frame

    if (mo.otherDirection) {
      this.flipImageBack(mo); // Flip image back if needed
    }
  }


  /**
   * Flips an image horizontally for drawing.
   * @param {GameObject} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save(); // Save the current canvas state
    this.ctx.translate(mo.width, 0); // Translate the canvas for flipping
    this.ctx.scale(-1, 1); // Flip the canvas horizontally
    mo.x = mo.x * -1; // Update object's x position for flipping
  }

  
  /**
   * Restores the canvas state after flipping the image.
   * @param {GameObject} mo - The object that was flipped.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; // Restore the object's original x position
    this.ctx.restore(); // Restore the canvas state
  }
}