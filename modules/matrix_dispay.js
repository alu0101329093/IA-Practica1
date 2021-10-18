/**
 * Display a matrix
 */
export class MatrixDisplay {
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
        () => new Array(height).fill('#000000'));
    this.colors = ['#000000', '#ffffff', '#ff0000', '#adff2f', '#0000ff'];
    if (context.canvas.width > width * tileWidth) {
      this.startingX = (context.canvas.width - width * tileWidth) / 2;
      console.log(this.startingX);
    }
    if (context.canvas.height > height * tileHeight) {
      this.startingY = (context.canvas.height * tileHeight - height) / 2;
      console.log(this.startingY);
    }
  }

  // eslint-disable-next-line require-jsdoc
  display() {
    this.clear();
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.context.fillStyle = this.matrix[i][j];
        this.context.fillRect((this.startingX + i) * this.tileWidth,
            (this.startingY + j) * this.tileHeight, this.tileWidth,
            this.tileHeight);
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  randomMatrix() {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    for (const colum of this.matrix) {
      for (let i = 0; i < colum.length; i++) {
        colum[i] = getRandomColor();
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
