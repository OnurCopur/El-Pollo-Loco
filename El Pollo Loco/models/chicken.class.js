class Chicken extends MovableObject{
    y = 360;
    height = 60;
    width = 80;

    constructor() {
        super().loadImage('El Pollo Loco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
    }
}