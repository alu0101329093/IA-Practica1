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
console.log(window.innerHeight);
canvas.height = window.innerHeight/1.5;
canvas.width = window.innerWidth/1.3;
const prueba = new MatrixDisplay(canvas.getContext('2d'), 100, 100, 5, 5);

document.addEventListener('keyup', (key) => {
  if (key.code == 'Space') {
    // prueba.randomMatrix();
    // prueba.display();
    window.api.send('stop');
  }
});

prueba.display();

window.api.receive('receiveMatrix',
    (/** @type {Array<Array>} */ matrix) => {
      prueba.matrix = matrix.map((item) => {
        return item.map((value) => {
          return prueba.colors[value];
        });
      });
      prueba.display();
    });
