/**
 * Display a matrix
 */
class MatrixDisplay {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {number} width
   * @param {number} height
   * @param {number} tileWidth
   * @param {number} tileHeight
   */
  constructor(context, width, height, tileWidth, tileHeight) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    /** @type {Array.<Array>} */
    this.matrix = Array.from(Array(width),
        () => new Array(height).fill(0));
    this.colors = ['#000000', '#ffffff', '#ff0000', '#adff2f', '#0000ff'];
    this.setStartingPoints();
    this.moveX = 0;
    this.moveY = 0;
  }

  // eslint-disable-next-line require-jsdoc
  display() {
    this.clear();
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.context.fillStyle = this.colors[this.matrix[i][j]];
        this.context.fillRect(this.startingX + this.moveX + i * this.tileWidth,
            this.startingY + this.moveY + j * this.tileHeight, this.tileWidth,
            this.tileHeight);
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  clear() {
    this.context.clearRect(0, 0, this.context.canvas.width,
        this.context.canvas.height);
  }

  // eslint-disable-next-line require-jsdoc
  setStartingPoints() {
    if (this.context.canvas.width > this.width * this.tileWidth) {
      this.startingX =
        Math.round(
            (this.context.canvas.width - this.width * this.tileWidth) / 2);
    } else {
      this.startingX = 0;
    }
    if (this.context.canvas.height > this.height * this.tileHeight) {
      this.startingY = Math.round(
          (this.context.canvas.height - this.height * this.tileHeight) / 2);
    } else {
      this.startingY = 0;
    }
  }
}

const Objects = {OBSTACLE: 0, ROAD: 1, CAR: 2, GOAL: 3, PATH: 4};

export {MatrixDisplay, Objects};
