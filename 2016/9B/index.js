'use strict';

const {
  getSequence
} = require('../9/functions');

const sequence = getSequence();

console.log(decompressedLength(sequence) === 11052855125);

function decompressedLength(sequenceSoFar, sum = 0) {

  const markerRegex = /\((\d+)x(\d+)\)/;

  const {
    0: marker,
    1: amountText,
    2: timesText,
    index: markerIndex
  } = sequenceSoFar.match(markerRegex) || [];

  if (!marker) {
    return sum + sequenceSoFar.length;
  }

  const amount = parseInt(amountText);
  const times = parseInt(timesText);

  const tailIndex = markerIndex + marker.length + amount;
  const tailLength = times * decompressedLength(sequenceSoFar.slice(tailIndex - amount, tailIndex));

  return decompressedLength(sequenceSoFar.slice(tailIndex), sum + markerIndex + tailLength);
}
