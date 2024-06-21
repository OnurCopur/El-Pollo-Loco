/*class Coin extends MovableObject {
    y = 365;
    height = 100;
    width = 100;

    IMAGES_COIN = [
        'El Pollo Loco/img/8_coin/coin_1.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1500;
        this.y = 100 + Math.random() * 200;

        this.playAnimation(this.IMAGES_COIN);
        this.checkCollisions();
    }

    checkCollisions() {
         this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); // Remove the coin from the array
                this.coinBar.increase(); // Update the coin bar
            }
        });
    }
}*/


class Coin extends MovableObject {
    y = 365;
    height = 100;
    width = 100;

    IMAGES_COIN = [
        'El Pollo Loco/img/8_coin/coin_1.png'
    ];

    constructor(world) {
        super();
        this.world = world;
        this.loadImages(this.IMAGES_COIN);
        this.x = 300 + Math.random() * 1500;
        this.y = 100 + Math.random() * 200;

        this.playAnimation(this.IMAGES_COIN);
    }

    
}
