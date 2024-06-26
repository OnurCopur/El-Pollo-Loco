class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 150;
  y = 0;
  height = 150;
  width = 100;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
        this instanceof Character ||
        this instanceof Chicken ||
        this instanceof SmallChicken ||
        this instanceof Endboss ||
        this instanceof Coin ||
        this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "transparent";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   *
   * @param {Array} arr  - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      //img.style = 'transform: scaleX(-1)'
      this.imageCache[path] = img;
    });
  }

  drawOffsetFrame(ctx, mo) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof Coin ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        mo.width - this.offset.left - this.offset.right,
        mo.height - this.offset.top - this.offset.bottom
      );
      ctx.stroke();
    }
  }
}
