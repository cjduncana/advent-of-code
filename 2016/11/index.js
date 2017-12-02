'use strict';

const _ = require('lodash');

const {
  getLayout
} = require('../11/functions');

if (require.main === module) {

  const originalState = getLayout('11A');

  const finalState = evaluateMovement(originalState);

  console.log((finalState.success) ? `Success in ${finalState.steps} steps.` : 'Never reached success.');

}

function evaluateMovement(state) {
  if (hasEnded(state)) {
    const successfulState = _.cloneDeep(state);
    successfulState.success = true;
    return successfulState;
  }

  if (state.failed) {
    const failedState = _.cloneDeep(state);
    failedState.failed = true;
    return failedState;
  }

  const currentFloor = findCurrentFloor(state);

  const possibleMoves = state[currentFloor].filter(notElevator).reduce(findPossibleMoves, []);

  if (!possibleMoves.length) {
    const failedState = _.cloneDeep(state);
    failedState.failed = true;
    return failedState;
  }

  const allPossibleMoves = getPossibleMoves(state, possibleMoves);

  return allPossibleMoves.reduce(followMoves, state);
}

function followMoves(currentState, move) {
  const newState = moveItems(currentState, move);

  // console.log('Current State:\n', currentState);
  // console.log('Move:\n', move);
  // console.log('New State:\n', newState);
  // debugger;

  if (brokenRules(newState) || previousState(newState, currentState.previousStates)) {
    return currentState;
  }

  newState.previousStates = currentState.previousStates.concat(baseState(newState));

  const possibleState = evaluateMovement(newState);
  // debugger;

  if (possibleState.failed) {
    return currentState;
  }

  if (hasEnded(currentState) && hasEnded(possibleState)) {

    if (possibleState.steps < currentState.steps) {
      const successfulPossibleState = _.cloneDeep(possibleState);
      successfulPossibleState.success = true;
      return successfulPossibleState;
    }

    const successfulCurrentState = _.cloneDeep(currentState);
    successfulCurrentState.success = true;
    return successfulCurrentState;
  }

  return possibleState;
}

function brokenRules(state) {
  const floors = _.filter(state, (items, floor) => !isNaN(floor));

  return !floors.every(followRules);
}

function followRules(items) {
  const microchips = items.filter(isMicrochip).map(getElement);
  const generators = items.filter(isGenerator).map(getElement);

  if (!generators.length) {
    return true;
  }

  return microchips.every((microchip) => generators.includes(microchip));
}

function getElement(item) {
  return item.slice(0, 2);
}

function isMicrochip(item) {
  return item[2] === 'M';
}

function isGenerator(item) {
  return item[2] === 'G';
}

function moveItems(state, move) {
  const [direction, ...items] = move;
  const currentFloor = findCurrentFloor(state);

  if ((direction === 'UP' && currentFloor >= 4) || (direction === 'DOWN' && currentFloor <= 1)) {
    return state;
  }

  if (!state[currentFloor].includes('E')) {
    return state;
  }

  if (_.difference(items, state[currentFloor]).length > 0) {
    return state;
  }

  if (direction === 'UP' && _.difference(items, state[currentFloor + 1]).length !== items.length) {
    return state;
  }

  if (direction === 'DOWN' && _.difference(items, state[currentFloor - 1]).length !== items.length) {
    return state;
  }

  const beforeMovement = removeItems(state, items);
  const afterMovement = addItems(beforeMovement, items, direction);
  afterMovement.steps = state.steps + 1;
  return afterMovement;
}

function removeItems(state, items) {
  const currentFloor = findCurrentFloor(state);
  const newState = _.cloneDeep(state);
  newState[currentFloor] = state[currentFloor].filter((item) => {
    return !items.includes(item);
  });
  return newState;
}

function addItems(state, items, direction) {
  const currentFloor = findCurrentFloor(state);
  const newState = _.cloneDeep(state);

  if (direction === 'UP') {
    const nextFloor = currentFloor + 1;
    newState[nextFloor] = state[nextFloor].concat(items, ['E']);
    newState[currentFloor] = state[currentFloor].filter(notElevator);
    return newState;
  }

  if (direction === 'DOWN') {
    const nextFloor = currentFloor - 1;
    newState[nextFloor] = state[nextFloor].concat(items, ['E']);
    newState[currentFloor] = state[currentFloor].filter(notElevator);
    return newState;
  }

  return newState;
}

function hasElevator(onFloor) {
  return (Array.isArray(onFloor)) ? onFloor.includes('E') : false;
}

function hasEnded(state) {
  return !state[1].length && !state[2].length && !state[3].length;
}

function findPossibleMoves(currentMoveSet, item) {
  if (hasOtherMoves(currentMoveSet, item)) {
    return assignOtherMoves(currentMoveSet, item).concat([[item]]);
  }

  return currentMoveSet.concat([[item]]);
}

function getPossibleMoves(state, moves) {
  return moves.reduce((moveSet, move) => {
    const upMove = ['UP'].concat(move);
    const downMove = ['DOWN'].concat(move);

    return moveSet.concat([upMove, downMove]);
  }, []);
}

function notElevator(item) {
  return item !== 'E';
}

function hasOtherMoves(moveSet, item) {
  return !!otherMoves(moveSet, item).length;
}

function assignOtherMoves(moveSet, item) {
  const possibleMoves = otherMoves(moveSet, item).filter(isSingle);

  const moves = possibleMoves.map((move) => {
    return [move[0], item];
  });

  return moveSet.concat(moves);
}

function otherMoves(moveSet, item) {
  return moveSet.filter((moves) => {
    return !moves.includes(item);
  });
}

function isSingle(array = []) {
  return array.filter(notElevator).length === 1;
}

function findCurrentFloor(state) {
  return parseInt(_.findKey(state, hasElevator));
}

function previousState(newState, previousStates) {
  return previousStates.some((state) => {
    const firstFloor = areDifferentItems(state[1], newState[1]);
    const secondFloor = areDifferentItems(state[2], newState[2]);
    const thirdFloor = areDifferentItems(state[3], newState[3]);
    const fourthFloor = areDifferentItems(state[4], newState[4]);

    return !firstFloor && !secondFloor && !thirdFloor && !fourthFloor;
  });
}

function areDifferentItems(a, b) {
  const itemsA = a.filter(notElevator);
  const itemsB = b.filter(notElevator);
  return _.difference(itemsA, itemsB).length || _.difference(itemsB, itemsA).length;
}

function baseState(state) {
  return {
    1: state[1],
    2: state[2],
    3: state[3],
    4: state[4]
  };
}

module.exports = {
  areDifferentItems,
  getPossibleMoves,
  moveItems
};
