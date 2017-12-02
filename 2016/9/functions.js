'use strict';

const fs = require('fs');
const path = require('path');

function getSequence(test = '') {
  const test9A = [
    'ADVENT',
    'A(1x5)BC',
    '(3x3)XYZ',
    'A(2x2)BCD(2x2)EFG',
    '(6x1)(1x3)A',
    'X(8x2)(3x3)ABCY'
  ];

  const test9B = [
    '(3x3)XYZ',
    'X(8x2)(3x3)ABCY',
    '(27x12)(20x12)(13x14)(7x10)(1x12)A',
    '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'
  ];

  if (test.slice(0, 2) === '9A') {
    return test9A[parseInt(test[2]) - 1];
  }

  if (test.slice(0, 2) === '9B') {
    return test9B[parseInt(test[2]) - 1];
  }

  const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  return raw.split('\n')[0];
}

module.exports = {
  getSequence
};
