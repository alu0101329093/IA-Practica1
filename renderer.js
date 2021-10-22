import {MatrixDisplay, Objects} from './modules/matrix_dispay.js';

const menuButtonObstacle = document.getElementById('menu-button-obstacle');
const menuButtonRoad = document.getElementById('menu-button-road');
const menuButtonCar = document.getElementById('menu-button-car');
const menuButtonGoal = document.getElementById('menu-button-goal');
const menuButtonPath = document.getElementById('menu-button-path');
const menuPlayButton = document.getElementById('menu-play-button');

menuButtonObstacle.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'black';
menuButtonRoad.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'white';
menuButtonCar.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'red';
menuButtonGoal.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'greenyellow';
menuButtonPath.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'blue';

menuPlayButton.addEventListener('click', () => {
  menuPlayButton.classList.toggle('pause');
});

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.height = Math.floor(window.innerHeight/1.5);
canvas.width = Math.floor(window.innerWidth/1.3);

const displayer = new MatrixDisplay(canvas.getContext('2d'), 50, 50, 5, 5);
displayer.display();
const Mode = {NONE: 0, DRAW: 1, DRAG: 2};
const mode = Mode.DRAG;
let clickingCanvas = false;
let objectSelected = Objects.ROAD;

menuButtonObstacle.addEventListener('click', () => {
  objectSelected = Objects.OBSTACLE;
});
menuButtonRoad.addEventListener('click', () => {
  objectSelected = Objects.ROAD;
});
menuButtonCar.addEventListener('click', () => {
  objectSelected = Objects.CAR;
});
menuButtonGoal.addEventListener('click', () => {
  objectSelected = Objects.GOAL;
});

document.addEventListener('keyup', (key) => {
  if (key.code == 'Space') {
    // prueba.randomMatrix();
    // prueba.display();
    window.api.send('stop');
  }
});

window.addEventListener('resize', () => {
  canvas.height = Math.floor(window.innerHeight/1.5);
  canvas.width = Math.floor(window.innerWidth/1.3);
  displayer.setStartingPoints();
  displayer.display();
});

canvas.addEventListener('mousedown', (event) => {
  clickingCanvas = true;
  prevX = 0;
  prevY = 0;
});

window.addEventListener('mouseup', () => {
  clickingCanvas = false;
  prevX = 0;
  prevY = 0;
});

let prevX = 0;
let prevY = 0;
window.addEventListener('mousemove', (event) => {
  if (clickingCanvas) {
    if (prevX > 0 || prevY > 0) {
      displayer.moveX += event.pageX - prevX;
      displayer.moveY += event.pageY - prevY;
      displayer.display();
    }
    prevX = event.pageX;
    prevY = event.pageY;
  }
});

document.getElementById('coords-input').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  let xCoord = document.getElementById('x-coord');
  xCoord = Math.max(0, Math.min(displayer.width, xCoord.value));
  /** @type {HTMLInputElement} */
  let yCoord = document.getElementById('y-coord');
  yCoord = Math.max(0, Math.min(displayer.height, yCoord.value));
  displayer.matrix[xCoord][yCoord] = objectSelected;
  displayer.display();
});

document.getElementById('percentage-input').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const obstaclePercentage = document.getElementById('obstacle-percentage');
  displayer.generateRandomMatrix(obstaclePercentage.value, Objects.OBSTACLE);
  displayer.display();
});

document.getElementById('world-sizes-input').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const width = document.getElementById('world-width');
  /** @type {HTMLInputElement} */
  const height = document.getElementById('world-height');
  displayer.setSize(width.value, height.value);
  displayer.setStartingPoints();
  displayer.display();
});

// window.api.receive('receiveMatrix', (/** @type {Array<Array>} */ matrix) => {
//   displayer.matrix = matrix;
//   displayer.display();
// });
