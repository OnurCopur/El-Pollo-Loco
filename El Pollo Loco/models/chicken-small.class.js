class SmallChicken extends MovableObject {
    y = 390;
    height = 60;
    width = 80;

    IMAGES_WALKING2 = [
        'El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('El Pollo Loco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING2);

        this.x = 1000 + Math.random() * 1200;
        this.speed = 0.15 + Math.random() * 0.25; // Chicken laufen unterschiedlich schnell
        this.applyGravity();
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING2);
        }, 200);

        setInterval(() => {
            this.jump();
        }, 1000);
    }
    

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }        
        }, 1000 / 30);
    }


    isAboveGround() {
            return this.y < 360;
    }


    jump() {
        this.speedY = 20;
    }
}