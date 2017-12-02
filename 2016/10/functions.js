'use strict';

const fs = require('fs');
const path = require('path');

function getInstructions(test = '') {
  if (test === '10A') {
    return [
      'value 5 goes to bot 2',
      'bot 2 gives low to bot 1 and high to bot 0',
      'value 3 goes to bot 1',
      'bot 1 gives low to output 1 and high to bot 0',
      'bot 0 gives low to output 2 and high to output 0',
      'value 2 goes to bot 2'
    ];
  }

  const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  return raw.split('\n').filter((instruction) => instruction.length);
}

module.exports = {
  getInstructions
};
