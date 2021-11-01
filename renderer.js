import { MatrixDisplay, Objects } from './modules/matrix_dispay.js';

const menuButtonObstacle = document.getElementById('menu-button-obstacle');
const menuButtonRoad = document.getElementById('menu-button-road');
const menuButtonCar = document.getElementById('menu-button-car');
const menuButtonGoal = document.getElementById('menu-button-goal');
const menuButtonPath = document.getElementById('menu-button-path');
const menuPlayButton = document.getElementById('menu-play-button');
const menuZoomInButton = document.getElementById('menu-zoomin-button');
const menuZoomOutButton = document.getElementById('menu-zoomout-button');
/** @type {HTMLSelectElement} */
const waysSelection = document.getElementById('ways-selection');
/** @type {HTMLSelectElement} */
const heuristicSelection = document.getElementById('heuristic-selection');

menuButtonObstacle.getElementsByClassName(
  'menu-button-color',
)[0].style.backgroundColor = 'black';
menuButtonRoad.getElementsByClassName(
  'menu-button-color',
)[0].style.backgroundColor = 'white';
menuButtonCar.getElementsByClassName(
  'menu-button-color',
)[0].style.backgroundColor = 'red';
menuButtonGoal.getElementsByClassName(
  'menu-button-color',
)[0].style.backgroundColor = 'greenyellow';
menuButtonPath.getElementsByClassName(
  'menu-button-color',
)[0].style.backgroundColor = 'blue';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.height = Math.floor(window.innerHeight / 1.5);
canvas.width = Math.floor(window.innerWidth / 1.3);

const displayer = new MatrixDisplay(canvas.getContext('2d'), 50, 50, 3, 3);
displayer.display();
const Mode = { NONE: 0, DRAW: 1, DRAG: 2 };
const mode = Mode.DRAG;
let clickingCanvas = false;
let objectSelected = Objects.ROAD;
let car = [];
let goal = [];
const Ways = { FourWays: 0, EightWays: 1 };
let ways = Ways.FourWays;
const HeuristicFunctions = { Rectilinear: 0, Euclidean: 1 };
let heuristicFunction = HeuristicFunctions.Rectilinear;

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
    window.api.send('stop');
  }
});

window.addEventListener('resize', () => {
  canvas.height = Math.floor(window.innerHeight / 1.5);
  canvas.width = Math.floor(window.innerWidth / 1.3);
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
  if (displayer.matrix[xCoord][yCoord] == Objects.CAR) {
    car = [];
  }
  if (displayer.matrix[xCoord][yCoord] == Objects.GOAL) {
    goal = [];
  }
  if (objectSelected === Objects.CAR) {
    if (car.length !== 0) {
      displayer.matrix[car[0]][car[1]] = Objects.ROAD;
    }
    car = [xCoord, yCoord];
  }
  if (objectSelected === Objects.GOAL) {
    if (goal.length !== 0) {
      displayer.matrix[goal[0]][goal[1]] = Objects.ROAD;
    }
    goal = [xCoord, yCoord];
  }
  displayer.matrix[xCoord][yCoord] = objectSelected;
  displayer.display();
});

document.getElementById('percentage-input').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const obstaclePercentage = document.getElementById('obstacle-percentage');
  displayer.generateRandomMatrix(obstaclePercentage.value, Objects.OBSTACLE);
  if (car.length === 2) displayer.matrix[car[0]][car[1]] = Objects.CAR;
  if (goal.length === 2) displayer.matrix[goal[0]][goal[1]] = Objects.GOAL;
  displayer.display();
});

document.getElementById('world-sizes-input').addEventListener('click', () => {
  /** @type {HTMLInputElement} */
  const width = document.getElementById('world-width');
  /** @type {HTMLInputElement} */
  const height = document.getElementById('world-height');
  displayer.setSize(width.value, height.value);
  displayer.setStartingPoints();
  displayer.resetMove();
  displayer.display();
});

menuPlayButton.addEventListener('click', () => {
  if (!menuPlayButton.classList.contains('pause')) {
    if (car.length > 0 && goal.length > 0) {
      menuPlayButton.classList.add('pause');
      const message = {
        matrix: displayer.matrix,
        start: car,
        goal: goal,
        ways: ways,
        heuristicFunction: heuristicFunction,
      };
      window.api.send('sendMatrix', message);
    }
  }
});

menuZoomInButton.addEventListener('click', () => {
  console.log(displayer.tileHeight);
  if (displayer.tileWidth < 9) {
    displayer.tileWidth += 2;
    displayer.tileHeight += 2;
    displayer.setStartingPoints();
    displayer.display();
  }
});

menuZoomOutButton.addEventListener('click', () => {
  console.log(displayer.tileHeight);
  if (displayer.tileWidth > 1) {
    displayer.tileWidth -= 2;
    displayer.tileHeight -= 2;
    displayer.setStartingPoints();
    displayer.display();
  }
});

waysSelection.addEventListener('change', () => {
  if (waysSelection.value === '4ways') ways = Ways.FourWays;
  if (waysSelection.value === '8ways') ways = Ways.EightWays;
});

heuristicSelection.addEventListener('change', () => {
  if (heuristicSelection.value === 'rectilinear')
    heuristicFunction = HeuristicFunctions.Rectilinear;
  if (heuristicSelection.value === 'euclidean')
    heuristicFunction = HeuristicFunctions.Euclidean;
});

window.api.receive('receivePath', (/** @type {Array<Array<int>>} */ path) => {
  displayer.display();
  let index = 0;
  let interval = setInterval(() => {
    if (index < path.length - 1) {
      displayer.matrix[path[index][0]][path[index++][1]] = Objects.PATH;
      displayer.display();
    } else {
      setTimeout(() => {
        menuPlayButton.classList.remove('pause');
      }, 500);
      clearInterval(interval);
    }
  }, 1);
});
