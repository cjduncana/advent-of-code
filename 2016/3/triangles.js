'use strict';

const path = require('path');
const fs = require('fs');

module.exports = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')
  .trim().split('\n').map((side) => {
    return side.trim().split(/\s+/).map((number) => parseInt(number));
  });
