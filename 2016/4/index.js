'use strict';

const _ = require('lodash');

const rooms = require('./rooms');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const real = rooms.filter(({ name = '', checksum }, index) => {
  const count = _.countBy(name.replace(/\-/g, '').split(''));

  const byLetters = _.reduce(count, (result, value, key) => {
    if (!result[value]) {
      result[value] = [];
    }

    result[value].push(key);

    return result;
  }, {});

  const lettersInOrder = [];

  for (const value in byLetters) {
    // Could be faulty. It is not neccessarily true that it is in order.
    lettersInOrder.unshift(byLetters[value].sort());
  }

  const potential = _.flatten(lettersInOrder).join('').slice(0, 5);

  return potential === checksum;
});

// First part of the puzzle
const sum = real.reduce((total, room) => total + room.id, 0);

console.log(sum);

// Second part of the puzzle
const decrypted = real.map(({ name, id }) => {
  const nameArray = name.split('');

  const decryptedArray = nameArray.map((char) => {
    if (char === '-') {
      return ' ';
    }

    const current = alphabet.indexOf(char);

    const newPosition = (current + id) % alphabet.length;

    return alphabet.charAt(newPosition);
  });

  const decryptedName = decryptedArray.join('');

  return { name: decryptedName, id };
});

const found = decrypted.filter(({ name }) => name.includes('north'));

console.log(found);
