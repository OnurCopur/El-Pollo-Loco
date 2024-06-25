class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar();
  coinBar = new CoinBar();
  bottleBar = new BottleBar();
  coins = [];
  throwableObjects = [];
  bottles = [];
  initialBottleCount = this.level.bottles.length;
  coin_sound = new Audio("El Pollo Loco/audio/coin.mp3");
  bottle_sound = new Audio("El Pollo Loco/audio/bottle.mp3");
  throw_sound = new Audio("El Pollo Loco/audio/throw.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.initializeEnemies(); // Initialize the enemies (including chickens)
  }

  setWorld() {
    this.character.world = this;
  }

  initializeEnemies() {
    this.level.enemies.forEach((enemy) => {
      enemy.world = this; // Set the world property for each enemy
    });
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.SPACE) {
      if (this.bottles.length > 0) {
        this.throw_sound.play();
        let bottle = new ThrowableObject(
          this.character.x + 50,
          this.character.y + 100
        );
        this.throwableObjects.push(bottle);
        this.bottles.pop(); // Remove a bottle from the collected bottles
        this.updateBottleBar(); // Update the bottle bar
      }
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isHurt()) {
        if (this.character.isAboveGround()) {
          enemy.die(); // Character springt von oben auf das Huhn
        } else {
          this.character.hit(); // Character kollidiert seitlich mit dem Huhn
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  

    // Check collision with coins
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coin_sound.play();
        this.level.coins.splice(index, 1); // Remove the coin from the array
        this.coins.push(coin); // Add the coin to the collected coins array
        this.updateCoinBar(); // Update the coin bar
      }
    });

    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.bottle_sound.play();
        this.level.bottles.splice(index, 1); // Remove the coin from the array
        this.bottles.push(bottle); // Add the coin to the collected coins array
        this.updateBottleBar(); // Update the coin bar
      }
    });
  }

  updateCoinBar() {
    const totalCoins = this.level.coins.length + this.coins.length;
    const collectedCoins = this.coins.length;
    const percentage = (collectedCoins / totalCoins) * 100;
    this.coinBar.setPercentage(percentage);
  }

  updateBottleBar() {
    const collectedBottles = this.bottles.length;
    const percentage = (collectedBottles / this.initialBottleCount) * 100;
    this.bottleBar.setPercentage(percentage);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // -------------Space for fixed objects ----------
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawOffsetFrame(this.ctx, mo);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); // Verschiebung um die Breite des Bildes
    this.ctx.scale(-1, 1); //Spiegelung um 180 Grad
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
