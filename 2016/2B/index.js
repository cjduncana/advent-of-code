'use strict';

const directions = require('./directions');

const code = [];

const position = {
  x: 0,
  y: 2
};

directions.forEach((dir) => {
  for (let i = 0; i < dir.length; i++) {

    if (position.x === 0 && dir[i] === 'R') {
      if (position.y === 2) {
        if (dir[i] === 'R') {
          move(dir[i]);
        }
      }
    } else if (position.x === 1) {
      if (position.y === 1) {
        if (['R', 'D'].includes(dir[i])) {
          move(dir[i]);
        }
      } else if (position.y === 2) {
        move(dir[i]);
      } else if (position.y === 3) {
        if (['R', 'U'].includes(dir[i])) {
          move(dir[i]);
        }
      }
    } else if (position.x === 2) {
      if (position.y === 0) {
        if (dir[i] === 'D') {
          move(dir[i]);
        }
      } else if ([1, 2, 3].includes(position.y)) {
        move(dir[i]);
      } else if (position.y === 4) {
        if (dir[i] === 'U') {
          move(dir[i]);
        }
      }
    } else if (position.x === 3) {
      if (position.y === 1) {
        if (['L', 'D'].includes(dir[i])) {
          move(dir[i]);
        }
      } else if (position.y === 2) {
        move(dir[i]);
      } else if (position.y === 3) {
        if (['L', 'U'].includes(dir[i])) {
          move(dir[i]);
        }
      }
    } else if (position.x === 4) {
      if (position.y === 2) {
        if (dir[i] === 'L') {
          move(dir[i]);
        }
      }
    }
  }

  code.push(keyboard(position));
});

console.log(code.join(''));

function move(direction) {
  if (direction === 'U') {
    --position.y;
  } else if (direction === 'D') {
    ++position.y;
  } else if (direction === 'L') {
    --position.x;
  } else if (direction === 'R') {
    ++position.x;
  }
}

function keyboard({ x, y }) {
  if (y === 0) {
    if (x === 2) {
      return 1;
    }
  } else if (y === 1) {
    if (x === 1) {
      return 2;
    } else if (x === 2) {
      return 3;
    } else if (x === 3) {
      return 4;
    }
  } else if (y === 2) {
    if (x === 0) {
      return 5;
    } else if (x === 1) {
      return 6;
    } else if (x === 2) {
      return 7;
    } else if (x === 3) {
      return 8;
    } else if (x === 4) {
      return 9;
    }
  } else if (y === 3) {
    if (x === 1) {
      return 'A';
    } else if (x === 2) {
      return 'B';
    } else if (x === 3) {
      return 'C';
    }
  } else if (y === 4) {
    if (x === 2) {
      return 'D';
    }
  }
}
