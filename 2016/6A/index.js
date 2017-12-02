'use strict';

const _ = require('lodash');

const messages = require('./messages');

const correctMessage = [];

const messageLength = messages[0].length;

messages.forEach((message, index) => {
  if (message.length !== messageLength) {
    throw new Error(`Message #${index + 1} has ${message.length} characters instead of ${messageLength} characters.`);
  }
});

for (let i = 0; i < messageLength; i++) {
  const ithCharacters = _.countBy(messages.map((message) => message[i]));
  const most = _.reduce(ithCharacters, (result, rate, character) => {
    if (result < rate) {
      return rate;
    }
    return result;
  }, 0);
  correctMessage.push(_.findKey(ithCharacters, (rate) => rate === most));
}

console.log(correctMessage.join(''));
