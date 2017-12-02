'use strict';

const md5 = require('md5');

const input = 'ugkcyxxp';
let index = 0;

const finalKey = [];

for (let i = 0; i < 8; i++) {
  let md5Result = '';
  while (md5Result.slice(0, 5) !== '00000') {
    md5Result = md5(input + index);
    index++;
  }
  console.log(i + 1);
  finalKey.push(md5Result[5]);
}

console.log(finalKey.join(''));
