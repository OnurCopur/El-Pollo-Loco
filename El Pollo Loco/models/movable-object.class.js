class MovableObject {
    x = 120;
    y = 280;
    img;
    height =  150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr  - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation() {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i  = 0 % 6;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('Moving right');
    }

       moveLeft() {
        setInterval(() => {
            this.x -= this.speed; // Verringere x um 15 jedes Mal
        },1000 / 60); // 60 FPS
    }
}