'use strict';

const fs = require('fs');
const path = require('path');

function areLetters(text = '') {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  return text.length && text.split('').every((letter) => {
    return alphabet.includes(letter);
  });
}

function getIps(test = '') {
  if (test === '7A') {
    return [
      'abba[mnop]qrst',
      'abcd[bddb]xyyx',
      'aaaa[qwer]tyui',
      'ioxxoj[asdfgh]zxcvbn'
    ];
  }

  if (test === '7B') {
    return [
      'aba[bab]xyz',
      'xyx[xyx]xyx',
      'aaa[kek]eke',
      'zazbz[bzb]cdb'
    ];
  }

  const raw = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

  return raw.split('\n').filter((ip) => ip.length);
}

function getHypernet(text) {
  return text.replace(/\w+\[|\]\w+\[|\]\w+/g, '-');
}

function getSupernet(text) {
  return text.replace(/\[\w+\]/g, '-');
}

module.exports = {
  areLetters,
  getIps,
  getHypernet,
  getSupernet
};
