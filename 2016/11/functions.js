'use strict';

function getLayout(test = '') {
  if (test === '11A') {
    return {
      1: ['E', 'HyM', 'LiM'],
      2: ['HyG'],
      3: ['LiG'],
      4: [],
      steps: 0,
      previousStates: []
    };
  }

  return {
    1: ['E', 'PoG', 'ThG', 'ThM', 'PrG', 'RuG', 'RuM', 'CoG', 'CoM'],
    2: ['PoM', 'PrM'],
    3: [],
    4: [],
    steps: 0,
    previousStates: []
  };
}

module.exports = {
  getLayout
};
