'use strict';

const {
  areLetters,
  getIps,
  getHypernet,
  getSupernet
} = require('../7/functions');

const ips = getIps();

const valid = ips.filter(isValid);

console.log(valid.length);

function isValid(ip) {
  const abas = findAbas(ip);
  const babs = findBabs(ip);

  return isMatch(abas, babs);
}

function isMatch(abas, babs) {
  return abas.some(([a, b]) => {
    const bab = b + a + b;
    return babs.includes(bab);
  });
}

function findAbas(text) {
  const supernet = getSupernet(text);
  return findXyxs(supernet);
}

function findBabs(text) {
  const hypernet = getHypernet(text);
  return findXyxs(hypernet);
}

function findXyxs(text) {
  const possibleXyxs = text.split('').map(getXyx);
  return possibleXyxs.filter(areLetters);
}

function getXyx(char, index, arr) {
  if (char === arr[index + 2] && char !== arr[index + 1]) {
    return arr.slice(index, index + 3).join('');
  }
}
