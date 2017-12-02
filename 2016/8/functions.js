'use strict';

const fs = require('fs');
const path = require('path');

function createScreen(width, height) {
  const screen = [];

  for (let i = 0; i < height; i++) {
    const row = [];

    for (let j = 0; j < width; j++) {
      row.push(false);
    }

    screen.push(row);
  }

  return screen;
}

function getInstructions(test = '') {
  if (test === '8A') {
    return [
      'rect 3x2',
      'rotate column x=1 by 1',
      'rotate row y=0 by 4',
      'rotate column x=1 by 1'
    ];
  }

  const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  return raw.split('\n').filter((instruction) => instruction.length);
}

function getScreen(test = '') {
  if (test === '8A') {
    const width = 7;
    const height = 3;
    return createScreen(width, height);
  }

  const width = 50;
  const height = 6;
  return createScreen(width, height);
};

function printScreen(screen) {
  screen.forEach((row) => {
    const formattedRow = row.map((space) => {
      return (space) ? '#' : '.';
    }).join('');

    console.log(formattedRow);
  });
}

module.exports = {
  getInstructions,
  getScreen,
  printScreen
};
