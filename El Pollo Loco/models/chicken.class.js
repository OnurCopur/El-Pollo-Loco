class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 80;
    IMAGES_WALKING = [
        'El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25; // Chicken laufen unterschiedlich schnell
        this.animate();
    }
    

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
        this.moveLeft();
    }
}
