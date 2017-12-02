'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

module.exports = raw.split('\n').map((rawRoom) => {
  if (rawRoom.length === 0) {
    return {};
  }

  const separated = rawRoom.split('-');

  const name = _.initial(separated).join('-');

  const lastPortion = separated[separated.length - 1];

  const id = parseInt(lastPortion.match(/\d+/)[0]);

  const checksum = lastPortion.match(/[a-z]+/)[0];

  return { name, id, checksum };
});
