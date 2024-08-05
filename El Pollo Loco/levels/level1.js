/**
 * Initializes and returns the first level of the game.
 *
 * @returns {Level} The initialized level.
 */
function initLevel() {
  level1 = new Level(
    [
      new Chicken(500),
      new Chicken(750),
      new Chicken(1000),
      new Chicken(1250),
      new SmallChicken(1350),
      new SmallChicken(1500),
      new Chicken(1650),
      new SmallChicken(1700),
      new SmallChicken(1800),
      new Chicken(850),
      new SmallChicken(2000),
      new Chicken(2150),
      new SmallChicken(2250),
      new Endboss()
    ],
    [
      new Cloud(300),
      new Cloud(1000),
      new Cloud(1500),
      new Cloud(2100),
      new Cloud(2600)
    ],
    [
      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', -719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/2.png', -719),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 0),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/2.png', 719),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 719 * 2),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/1.png', 719 * 2),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/1.png', 719 * 2),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/1.png', 719 * 2),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 719 * 3),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/2.png', 719 * 3),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/2.png', 719 * 3),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/2.png', 719 * 3),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 719 * 4),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/1.png', 719 * 4),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/1.png', 719 * 4),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/1.png', 719 * 4),

      new BackgroundObject('El Pollo Loco/img/5_background/layers/air.png', 719 * 5),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/3_third_layer/2.png', 719 * 5),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/2_second_layer/2.png', 719 * 5),
      new BackgroundObject('El Pollo Loco/img/5_background/layers/1_first_layer/2.png', 719 * 5),
    ],
    [
      new Coin(400, 250),
      new Coin(450, 200),
      new Coin(500, 200),
      new Coin(550, 200),
      new Coin(600, 250),
      new Coin(1050, 350),
      new Coin(1100, 350),
      new Coin(1150, 350),
      new Coin(1200, 200),
      new Coin(1250, 200),
      new Coin(2600, 200),
      new Coin(2600, 250),
      new Coin(2600, 300),
      new Coin(2600, 350),
    ],
    [
      new Bottle(400),
      new Bottle(650),
      new Bottle(780),
      new Bottle(970),
      new Bottle(1350),
      new Bottle(1590),
      new Bottle(1750),
    ]
  );
  return level1;
}
