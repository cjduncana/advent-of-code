'use strict';

const {
  getSequence
} = require('../9/functions');

const sequence = getSequence();

const originalSequence = { sequence: '' };

const finalSequence = sequence.split('').reduce(marker, originalSequence);

console.log(finalSequence.sequence.length);

function marker(sequenceSoFar, character, index, sequenceArray) {
  if (sequenceSoFar.newIndex && index < sequenceSoFar.newIndex) {
    return sequenceSoFar;
  }

  if (character === ' ') {
    return sequenceSoFar;
  }

  if (character === '(') {
    const leftParens = index;
    const rightParens = sequenceArray.indexOf(')', leftParens);
    const marker = sequenceArray.slice(leftParens + 1, rightParens).join('');
    const [amountText, timesText] = marker.split('x');
    const amount = parseInt(amountText);
    const times = parseInt(timesText);
    const newIndex = rightParens + 1 + amount;
    const toBeRepeated = sequenceArray.slice(rightParens + 1, newIndex).join('');

    return {
      newIndex,
      sequence: sequenceSoFar.sequence + toBeRepeated.repeat(times)
    };
  }

  return { sequence: sequenceSoFar.sequence + character };
}
