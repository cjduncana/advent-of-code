'use strict';

const expect = require('expect');
const deepFreeze = require('deep-freeze');

const {
  areDifferentItems,
  getPossibleMoves,
  moveItems
} = require('../11');

function testAreDifferentItems() {
  const firstFloorOne = ['LiG'];
  const firstFloorTwo = ['LiG'];

  deepFreeze(firstFloorOne);
  deepFreeze(firstFloorTwo);

  expect(areDifferentItems(firstFloorOne, firstFloorTwo)).toEqual(false);
}

function testGetPossibleMoves() {
  const firstState = {
    1: ['E', 'HyM', 'LiM'],
    2: ['HyG'],
    3: ['LiG'],
    4: [],
    steps: 0,
    previousStates: []
  };
  const firstMoves = [['HyM'], ['LiM'], ['Hym', 'LiM']];
  const firstMovesAfter = [['UP', 'HyM'], ['DOWN', 'HyM'], ['UP', 'LiM'], ['DOWN', 'LiM'], ['UP', 'Hym', 'LiM'], ['DOWN', 'Hym', 'LiM']];

  deepFreeze(firstState);
  deepFreeze(firstMoves);

  // Should duplicate every entry and prepend in an alternating fashion UP
  // and DOWN if functioning correctly
  expect(getPossibleMoves(firstState, firstMoves)).toEqual(firstMovesAfter);
}

function testMoveItems() {
  const firstState = {
    1: ['LiM'],
    2: ['HyM'],
    3: ['HyG'],
    4: ['LiG', 'E'],
    steps: 3,
    previousStates: [{
      1: ['LiM'],
      2: ['HyG', 'HyM', 'E'],
      3: ['LiG'],
      4: []
    }, {
      1: ['LiM'],
      2: ['HyM'],
      3: ['LiG', 'HyG', 'E'],
      4: []
    }, {
      1: ['LiM'],
      2: ['HyM'],
      3: ['HyG'],
      4: ['LiG', 'E']
    }]
  };
  const firstMove = ['DOWN', 'HyM'];

  deepFreeze(firstState);
  deepFreeze(firstMove);

  // Should return the same state if the current floor does not have a needed
  // item
  expect(moveItems(firstState, firstMove)).toBe(firstState);
}

testAreDifferentItems();
testGetPossibleMoves();
testMoveItems();
console.log('All tests passed!');
