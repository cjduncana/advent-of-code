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
  const supernet = getSupernet(ip);
  const hypernet = getHypernet(ip);

  return abbaReduce(supernet) && !abbaReduce(hypernet);
}

function abbaReduce(text) {
  return text.split('').reduce(abbaChecker, false);
}

function abbaChecker(valid, character, index, ipArray) {
  const abba = ipArray.slice(index, index + 4);
  return valid || isAbba(abba);
}

function isAbba(text) {
  return (text.length === 4) && (areLetters(text.join(''))) &&
    (text[0] !== text[1]) && (text[0] === text[3]) && (text[1] === text[2]);
}
