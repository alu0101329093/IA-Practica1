import {MatrixDisplay} from './modules/matrix_dispay.js';

const menuButtonCar = document.getElementById('menu-button-car');
const menuButtonRoad = document.getElementById('menu-button-road');
const menuButtonObstacle = document.getElementById('menu-button-obstacle');
const menuButtonGoal = document.getElementById('menu-button-goal');
const menuButtonPath = document.getElementById('menu-button-path');
const menuPlayButton = document.getElementById('menu-play-button');

menuButtonCar.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'red';
menuButtonRoad.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'white';
menuButtonObstacle.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'black';
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

const displayer = new MatrixDisplay(canvas.getContext('2d'), 100, 100, 4, 4);
const Mode = {NONE: 0, DRAW: 1, DRAG: 2};
const mode = Mode.NONE;

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
  switch (mode) {
    case Mode.DRAW:
      break;
    case Mode.DRAG:
      break;
    default:
  }
});

window.addEventListener('mouseup', () => {});

displayer.display();

window.api.receive('receiveMatrix',
    (/** @type {Array<Array>} */ matrix) => {
      displayer.matrix = matrix.map((item) => {
        return item.map((value) => {
          return displayer.colors[value];
        });
      });
      displayer.display();
    });
