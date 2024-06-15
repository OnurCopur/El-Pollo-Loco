class ThrowableObject extends MovableObject {

    constructor(x,y) {
        super().loadImage('El Pollo Loco/img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.throw();
    }
    

    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}