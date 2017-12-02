'use strict';

const md5 = require('md5');

const num = '01234567';
const hex = '0123456789abcdef';
const input = 'ugkcyxxp';
let index = 0;

const finalKey = [];

while (!isFull(finalKey)) {
  let md5Result = '';
  while (md5Result.slice(0, 5) !== '00000') {
    md5Result = md5(input + index);
    index++;
  }
  if (num.includes(md5Result[5]) && !hex.includes(finalKey[md5Result[5]])) {
    console.log(md5Result[5]);
    finalKey[md5Result[5]] = md5Result[6];
  }
}

console.log(finalKey.join(''));

function isFull(key) {
  let correct = true;
  for (let i = 0; i < 8; i++) {
    correct = correct && hex.includes(key[i]);
  }
  return correct;
}
