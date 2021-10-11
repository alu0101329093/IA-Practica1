import {MatrixDisplay} from './modules/matrix_dispay.js';

const menuButtonCar = document.getElementById('menu-button-car');
const menuButtonObstacle = document.getElementById('menu-button-obstacle');
const menuButtonGoal = document.getElementById('menu-button-goal');
const menuButtonPath = document.getElementById('menu-button-path');

menuButtonCar.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'red';
menuButtonObstacle.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'white';
menuButtonGoal.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'greenyellow';
menuButtonPath.getElementsByClassName('menu-button-color')[0].style.
    backgroundColor = 'blue';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const prueba =
  new MatrixDisplay(canvas.getContext('2d'), 100, 50, 10, 10);

document.addEventListener('keyup', (key) => {
  if (key.code == 'Space') {
    // prueba.randomMatrix();
    // prueba.display();
    window.api.send('stop');
  }
});

prueba.display();

window.api.receive('receiveMatrix', (/** @type {Array<Array>} */ matrix) => {
  prueba.matrix = matrix.map((item) => {
    return item.map((value) => {
      return prueba.colors[value];
    });
  });
  prueba.display();
});
