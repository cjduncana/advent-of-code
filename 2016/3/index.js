'use strict';

const triangles = require('./triangles');

const successes = triangles.filter(isPossible);

console.log(successes.length);

function isPossible([a, b, c]) {
  return (a + b > c) || (a + c > b) || (b + c > a);
}
