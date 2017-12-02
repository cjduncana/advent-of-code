'use strict';

const _ = require('lodash');

const {
  getInstructions
} = require('../10/functions');

const instructions = getInstructions();

const valueInstructions = instructions.filter(isValueInstruction).sort(sortValueInstructions);

const originalState = {
  alreadyFollowed: []
};

const afterValueInstructions = valueInstructions.reduce(followValueInstruction, originalState);

const transferInstructions = instructions.filter(isTransferInstruction).sort(sortTransferInstructions);

const finalState = transferInstructions.reduce(followTransferInstruction, afterValueInstructions);

console.log(secondAnswer(finalState));

function isValueInstruction(instruction) {
  const { receiver, value } = getParts(instruction);

  return receiver && value;
}

function isTransferInstruction(instruction) {
  const { giver, receiverLow, receiverHigh } = getParts(instruction);

  return giver && receiverLow && receiverHigh;
}

function sortValueInstructions(firstInstruction, secondInstruction) {
  const {
    receiver: firstReceiver,
    value: firstValue
  } = getParts(firstInstruction);
  const {
    receiver: secondReceiver,
    value: secondValue
  } = getParts(secondInstruction);

  const firstBot = firstReceiver.value;
  const secondBot = secondReceiver.value;

  return (firstBot === secondBot) ? firstValue - secondValue : firstBot - secondBot;
}

function sortTransferInstructions(firstInstruction, secondInstruction) {
  const {
    giver: firstGiver,
    receiverLow: firstReceiverLow,
    receiverHigh: firstReceiverHigh
  } = getParts(firstInstruction);
  const {
    giver: secondGiver,
    receiverLow: secondReceiverLow,
    receiverHigh: secondReceiverHigh
  } = getParts(secondInstruction);

  if (firstGiver.value === secondGiver.value) {

    if (firstReceiverLow.value === secondReceiverLow.value) {
      return firstReceiverHigh.value - secondReceiverHigh.value;
    }

    return firstReceiverLow.value - secondReceiverLow.value;
  }

  return firstGiver.value - secondGiver.value;
}

function followValueInstruction(currentState, instruction) {
  const { receiver, value } = getParts(instruction);

  return receiveValue(currentState, value, receiver);
}

function followTransferInstruction(currentState, instruction, index, instructions) {
  if (currentState.secondLevel) {
    const { giver, receiverLow, receiverHigh } = getParts(instruction);
    const giverValues = currentState[giver.name];

    const firstValue = smallestValue(giverValues);
    const secondValue = largestValue(giverValues);

    const firstTransfer = transferValue(currentState, firstValue, giver, receiverLow);
    const secondTransfer = transferValue(firstTransfer, secondValue, giver, receiverHigh);

    secondTransfer.alreadyFollowed = currentState.alreadyFollowed.concat([giver.name]);

    if (!currentState.answer) {
      const answer = _.findKey(secondTransfer, hasAnswer);
      secondTransfer.answer = answer;
    }

    const endSecondLevel = index === instructions.length - 1;
    if (endSecondLevel) {
      secondTransfer.secondLevel = false;
    }

    return secondTransfer;
  }

  const atLeastTwoChips = _.reduce(currentState, hasAtLeastTwoChips, []);
  const instructionIndexesToFollow = _.difference(atLeastTwoChips, currentState.alreadyFollowed);

  if (instructionIndexesToFollow.length) {
    const instructionsToFollow = findInstructions(instructionIndexesToFollow, instructions);
    const secondLevelState = _.cloneDeep(currentState);
    secondLevelState.secondLevel = true;
    return instructionsToFollow.reduce(followTransferInstruction, secondLevelState);
  }

  return currentState;
}

function transferValue(state, value, giver, receiver) {
  const giveState = giveValue(state, value, giver);
  const receiveState = receiveValue(giveState, value, receiver);
  return receiveState;
}

function giveValue(state, value, giver) {
  const newState = _.cloneDeep(state);

  const originalList = state[giver.name];
  if (!originalList || !Array.isArray(originalList)) {
    newState[giver.name] = [];
  } else {
    newState[giver.name] = originalList.filter((valueInList) => {
      return valueInList !== value;
    });
  }

  return newState;
}

function receiveValue(state, value, receiver) {
  const newState = _.cloneDeep(state);

  const originalList = state[receiver.name];
  if (!originalList || !Array.isArray(originalList)) {
    newState[receiver.name] = [value];
  } else {
    newState[receiver.name] = originalList.concat([value]);
  }

  return newState;
}

function getParts(instruction) {
  const instructionParts = instruction.split(' ');

  if (instructionParts[0] === 'value') {
    return {
      receiver: {
        name: instructionParts[4] + instructionParts[5],
        type: instructionParts[4],
        value: parseInt(instructionParts[5])
      },
      value: parseInt(instructionParts[1])
    };
  }

  if (instructionParts[0] === 'bot') {
    return {
      giver: {
        name: instructionParts[0] + instructionParts[1],
        type: instructionParts[0],
        value: parseInt(instructionParts[1])
      },
      receiverLow: {
        name: instructionParts[5] + instructionParts[6],
        type: instructionParts[5],
        value: parseInt(instructionParts[6])
      },
      receiverHigh: {
        name: instructionParts[10] + instructionParts[11],
        type: instructionParts[10],
        value: parseInt(instructionParts[11])
      }
    };
  }

  return {};
}

function hasAtLeastTwoChips(array, chips, haver) {
  if (haver.includes('bot') && chips.length >= 2) {
    return array.concat(haver);
  }
  return array;
}

function findInstructions(indexes, instructions) {
  return indexes.map((index) => {
    return instructions.find((instruction) => {
      const { giver } = getParts(instruction);
      return index === giver.name;
    });
  });
}

function smallestValue(list) {
  return list.sort(ascending)[0];
}

function ascending(a, b) {
  return a - b;
}

function largestValue(list) {
  return list.sort(descending)[0];
}

function descending(a, b) {
  return b - a;
}

function hasAnswer(list) {
  return (Array.isArray(list)) ? list.includes(61) && list.includes(17) : false;
}

function secondAnswer(state) {
  const chips = state['output0'].concat(state['output1'], state['output2']);
  return chips.reduce(multipy, 1);
}

function multipy(a, b) {
  return a * b;
}
