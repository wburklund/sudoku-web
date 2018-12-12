/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import { createStore } from 'redux';
import sudoku from './generator/sudoku';
import updateConflicts from './conflicts';

const emptyCell = { class: 'normal', value: '' };

const newGame = (difficulty) => {
  const state = {};
  state.difficulty = difficulty;
  state.grid = sudoku.generate(difficulty)
    .split('')
    .map(n => (n === '.' ? emptyCell : { class: 'given', value: n }));
  return state;
};

const initStore = () => {
  const savedState = JSON.parse(localStorage.getItem('sudoku_saved_game'));
  return savedState || newGame('medium');
};

const reducer = (oldState, action) => {
  let state = JSON.parse(JSON.stringify(oldState));

  // TODO: Refactor

  let thisCell;
  switch (action.type) {
    case 'RESET_GAME':
      state.grid = state.grid.map(cell => (cell.class === 'given' ? cell : emptyCell));
      break;
    case 'CELL_INPUT':
      thisCell = state.grid[action.index];
      if (!'123456789'.includes(action.value)
            || thisCell.class === 'given') {
        return state;
      }
      thisCell.class = 'normal';
      thisCell.value = action.value;
      break;
    case 'CELL_NOTE':
      thisCell = state.grid[action.index];
      if (!'123456789'.includes(action.value)
      || (thisCell.class !== 'notes' && thisCell.value !== '')) {
          return state;
      }
      if (thisCell.class !== 'notes') {
        thisCell.class = 'notes';
        thisCell.value = [];
      }
      thisCell.value[action.value - 1] = !thisCell.value[action.value - 1];
      break;
    case 'NEW_GAME':
      state = newGame(action.value);
      break;
    default:
      return state;
  }
  state.grid = updateConflicts(state.grid);
  localStorage.setItem('sudoku_saved_game', JSON.stringify(state));
  return state;
};

export default createStore(reducer, initStore());
