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

const sudokuStore = (oldState, action) => {
  let state = JSON.parse(JSON.stringify(oldState));

  switch (action.type) {
    case 'RESET_GAME':
      state.grid = state.grid.map(cell => (cell.class === 'given' ? cell : emptyCell));
      return state;
    case 'CELL_INPUT':
      if (!'123456789'.includes(action.value)
            || state.grid[action.index].class === 'given') {
        return state;
      }
      state.grid[action.index].value = action.value;
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

export default createStore(sudokuStore, initStore());
