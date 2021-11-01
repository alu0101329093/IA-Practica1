const Objects = { OBSTACLE: 0, ROAD: 1, CAR: 2, GOAL: 3, PATH: 4 };

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
    this.matrix = Array.from(Array(width), () =>
      new Array(height).fill(Objects.ROAD),
    );
    this.colors = ['#000000', '#ffffff', '#ff0000', '#adff2f', '#0000ff'];
    this.setStartingPoints();
    this.moveX = 0;
    this.moveY = 0;
  }

  // eslint-disable-next-line require-jsdoc
  display() {
    this.clear();
    const arrangedCoords = this.getArrangedCoords();
    for (let i = arrangedCoords.start.x; i < arrangedCoords.end.x; i++) {
      for (let j = arrangedCoords.start.y; j < arrangedCoords.end.y; j++) {
        this.context.fillStyle = this.colors[this.matrix[i][j]];
        this.context.fillRect(
          this.startingX + this.moveX + i * this.tileWidth,
          this.startingY + this.moveY + j * this.tileHeight,
          this.tileWidth,
          this.tileHeight,
        );
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  clear() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
  }

  // eslint-disable-next-line require-jsdoc
  setStartingPoints() {
    if (this.context.canvas.width > this.width * this.tileWidth) {
      this.startingX = Math.round(
        (this.context.canvas.width - this.width * this.tileWidth) / 2,
      );
    } else {
      this.startingX = 0;
    }
    if (this.context.canvas.height > this.height * this.tileHeight) {
      this.startingY = Math.round(
        (this.context.canvas.height - this.height * this.tileHeight) / 2,
      );
    } else {
      this.startingY = 0;
    }
  }

  /**
   * Generate a new matrix filled with a  percentage of the object
   * @param {number} percentage
   * @param {Objects} object
   */
  generateRandomMatrix(percentage, object) {
    this.matrix = Array.from(Array(this.width), () =>
      new Array(this.height).fill(Objects.ROAD),
    );
    percentage = Math.max(0, Math.min(100, percentage));
    const maxObstacleNumber = (this.width * this.height * percentage) / 100;
    let obstacleNumber = 0;
    while (obstacleNumber < maxObstacleNumber) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (this.matrix[x][y] !== object) {
        this.matrix[x][y] = object;
        obstacleNumber++;
      }
    }
  }

  // eslint-disable-next-line require-jsdoc
  setSize(width, height) {
    this.width = Number(width);
    this.height = Number(height);
    this.matrix = Array.from(Array(this.width), () =>
      new Array(this.height).fill(Objects.ROAD),
    );
  }

  /**
   * Return the coords whithin the matrix from where it should start and end
   * drawing
   * @return {{start: {x: Number, y: Number}, end: {x: Number, y: Number}}}
   */
  getArrangedCoords() {
    const matrixStartX = this.startingX + this.moveX;
    const matrixStartY = this.startingY + this.moveY;
    if (
      matrixStartX >= this.context.canvas.width ||
      matrixStartY >= this.context.canvas.height
    ) {
      return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
    }
    const matrixEndX = matrixStartX + this.width * this.tileWidth;
    const matrixEndY = matrixStartY + this.height * this.tileHeight;
    if (matrixEndX <= 0 || matrixEndY <= 0) {
      return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
    }

    const arrangedCoords = {
      start: { x: 0, y: 0 },
      end: { x: this.width, y: this.height },
    };
    if (matrixStartX < 0) {
      arrangedCoords.start.x = Math.floor(
        Math.abs(matrixStartX) / this.tileWidth,
      );
    }
    if (matrixStartY < 0) {
      arrangedCoords.start.y = Math.floor(
        Math.abs(matrixStartY) / this.tileHeight,
      );
    }
    if (matrixEndX > this.context.canvas.width) {
      arrangedCoords.end.x =
        this.width -
        Math.floor((matrixEndX - this.context.canvas.width) / this.tileWidth);
    }
    if (matrixEndY > this.context.canvas.height) {
      arrangedCoords.end.y =
        this.height -
        Math.floor((matrixEndY - this.context.canvas.height) / this.tileHeight);
    }
    return arrangedCoords;
  }

  // eslint-disable-next-line require-jsdoc
  resetMove() {
    this.moveX = 0;
    this.moveY = 0;
  }
}

export { MatrixDisplay, Objects };
