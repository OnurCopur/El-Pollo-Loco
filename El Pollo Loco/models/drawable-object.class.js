/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawableObject {
  /**
   * The image used for drawing the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Cache of loaded images indexed by their path.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * Index of the currently displayed image in an animation sequence.
   * @type {number}
   */
  currentImage = 0;

  /**
   * The x-coordinate of the object's position.
   * @type {number}
   */
  x = 150;

  /**
   * The y-coordinate of the object's position.
   * @type {number}
   */
  y = 0;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * The offset values for the object's collision detection.
   * @type {{top: number, left: number, right: number, bottom: number}}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 5,
  };

  /**
   * Loads an image from the specified path and sets it as the object's image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object for debugging purposes.
   * This method only draws the frame if the object is an instance of specific classes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
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
   * Loads multiple images and caches them.
   * @param {string[]} arr - An array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a frame around the object with offset adjustments for debugging purposes.
   * This method only draws the frame if the object is an instance of specific classes.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {MovableObject} mo - The movable object for which the frame is drawn.
   */
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
      ctx.strokeStyle = "transparent";
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
