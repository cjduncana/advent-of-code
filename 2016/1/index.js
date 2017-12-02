'use strict';

const directions = require('./directions');

const path = [];
let found = false;

const position = {
  x: 0,
  y: 0
};

path.push(Object.assign({}, position));

const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
let orientation = 0;

directions.forEach((dir) => {
  const turn = dir[0];
  const steps = parseInt(dir.slice(1));

  if (turn === 'R') {
    orientation++;
  } else if (turn === 'L') {
    orientation--;
  }

  if (orientation > 3) {
    orientation -= 4;
  } else if (orientation < 0) {
    orientation += 4;
  }

  if (orientation === NORTH) {
    position.y += steps;
  } else if (orientation === SOUTH) {
    position.y -= steps;
  } else if (orientation === EAST) {
    position.x += steps;
  } else if (orientation === WEST) {
    position.x -= steps;
  }

  check(position, orientation, steps);
});

console.log('Your movement is:');
if (position.y > 0) {
  console.log(`${position.y} NORTH`);
} else if (position.y < 0) {
  console.log(`${-position.y} SOUTH`);
}
if (position.x > 0) {
  console.log(`${position.x} EAST`);
} else if (position.x < 0) {
  console.log(`${-position.x} WEST`);
}
console.log(`A total of ${Math.abs(position.x) + Math.abs(position.y)} steps`);

function check(position, orientation, steps) {
  const originalPosition = Object.assign({}, position);

  if (orientation === NORTH) {
    originalPosition.y -= steps;
  } else if (orientation === SOUTH) {
    originalPosition.y += steps;
  } else if (orientation === EAST) {
    originalPosition.x -= steps;
  } else if (orientation === WEST) {
    originalPosition.x += steps;
  }

  for (let i = 0; i < steps; i++) {
    const newPosition = Object.assign({}, originalPosition);

    if (orientation === NORTH) {
      ++newPosition.y;
    } else if (orientation === SOUTH) {
      --newPosition.y;
    } else if (orientation === EAST) {
      ++newPosition.x;
    } else if (orientation === WEST) {
      --newPosition.x;
    }

    if (!found && path.some(({ x, y }) => {
      return (newPosition.x === x) && (newPosition.y === y);
    })) {
      console.log('You been in this position before:');
      if (newPosition.y > 0) {
        console.log(`${newPosition.y} NORTH`);
      } else if (newPosition.y < 0) {
        console.log(`${-newPosition.y} SOUTH`);
      }
      if (newPosition.x > 0) {
        console.log(`${newPosition.x} EAST`);
      } else if (newPosition.x < 0) {
        console.log(`${-newPosition.x} WEST`);
      }
      console.log(`A total of ${Math.abs(newPosition.x) + Math.abs(newPosition.y)} steps`);

      found = true;
    } else {
      path.push(newPosition);
    }

    originalPosition.x = newPosition.x;
    originalPosition.y = newPosition.y;
  }
}
