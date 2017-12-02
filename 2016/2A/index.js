'use strict';

const directions = require('./directions');

const code = [];

const position = {
  x: 1,
  y: 1
};

directions.forEach((dir) => {
  for (let i = 0; i < dir.length; i++) {

    const newPosition = Object.assign({}, position);

    if (dir[i] === 'U') {
      --newPosition.y;
    } else if (dir[i] === 'D') {
      ++newPosition.y;
    } else if (dir[i] === 'L') {
      --newPosition.x;
    } else if (dir[i] === 'R') {
      ++newPosition.x;
    }

    if (newPosition.x >= 0 && newPosition.x <= 2) {
      if (newPosition.y >= 0 && newPosition.y <= 2) {
        position.x = newPosition.x;
        position.y = newPosition.y;
      }
    }
  }

  code.push(keyboard(position));
});

console.log(code.join(''));

function keyboard({ x, y }) {
  if (y === 0) {
    if (x === 0) {
      return 1;
    } else if (x === 1) {
      return 2;
    } else if (x === 2) {
      return 3;
    }
  } else if (y === 1) {
    if (x === 0) {
      return 4;
    } else if (x === 1) {
      return 5;
    } else if (x === 2) {
      return 6;
    }
  } else if (y === 2) {
    if (x === 0) {
      return 7;
    } else if (x === 1) {
      return 8;
    } else if (x === 2) {
      return 9;
    }
  }
}
