class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }        
        }, 1000 / 25);
    }


    isAboveGround() {
        if((this instanceof ThrowableObject)) { // Throwable Objects should always fall
            return true;
        } else {
            return this.y < 130;
        }
    }


// character.isColliding(chicken);
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }


    hit() {
        this.energy -= 5;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    

    isDead() {
        return this.energy == 0;
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s 
        return timePassed < 1;

    }


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i  = 0 % 6;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed; // Verringere x um 15 jedes Mal
    }


    jump() {
        this.speedY = 30;
    }
}