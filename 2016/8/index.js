'use strict';

const {
  getInstructions,
  getScreen,
  printScreen
} = require('../8/functions');

const screen = getScreen();
const instructions = getInstructions();

// console.log(countPixels(lastScreen(screen, instructions)));

lastScreen(screen, instructions);

function lastScreen(screen, instructions) {
  // return instructions.reduce(followInstruction, screen);

  const lastScreenArray = instructions.reduce(followInstruction, screen);

  printScreen(lastScreenArray);
}

function followInstruction(screen, instruction) {
  // printScreen(screen);
  // console.log('\n', instruction);
  // debugger;
  const instructionParts = instruction.split(' ');

  if (instructionParts[0] === 'rect') {
    const size = instructionParts[1];
    const [width, height] = size.split('x');

    return turnRectangleOn(screen, parseInt(width), parseInt(height));
  }

  if (instructionParts[0] === 'rotate') {
    const [, orientation, position, , amount] = instructionParts;

    return rotateScreen(screen, orientation, parseInt(position.slice(2)), parseInt(amount));
  }

  return screen;
}

function turnRectangleOn(screen, width, height) {

  return screen.map((row, index) => {
    if (index < height) {

      return row.map((space, jndex) => {
        return (jndex < width) ? true : space;
      });
    }

    return row;
  });
}

function rotateScreen(screen, orientation, position, amount) {
  if (orientation === 'row') {
    return rotateRow(screen, position, amount);
  }

  if (orientation === 'column') {
    return rotateColumn(screen, position, amount);
  }

  return screen;
}

function rotateColumn(screen, position, amount) {
  const originalColumn = screen.map((row) => {
    return row[position];
  });

  return screen.map((row, index) => {
    const [...newRow] = row;

    const shift = findIndex(index - amount, originalColumn.length);

    newRow[position] = originalColumn[shift];

    return newRow;
  });
}

function rotateRow(screen, position, amount) {
  return screen.map((row, index) => {
    if (position === index) {
      const [...originalRow] = row;

      return row.map((point, jndex) => {
        const shift = findIndex(jndex - amount, originalRow.length);

        return originalRow[shift];
      });
    }

    return row;
  });
}

function findIndex(index, length) {
  if (index < 0) {
    return findIndex(index + length, length);
  }

  return index;
}

// function countPixels(screen) {
//   return screen.reduce((rowCount, row) => {
//     return rowCount + row.reduce((spaceCount, space) => {
//       if (space) {
//         return spaceCount + 1;
//       }
//
//       return spaceCount;
//     }, 0);
//   }, 0);
// }
