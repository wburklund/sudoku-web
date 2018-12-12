/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import sudoku from '../generator/sudoku';
import { deepCopyState } from './state';
import updateGame from './update';

const emptyCell = { type: 'normal', value: '' };

export const newGame = (difficulty) => {
  const state = {};
  state.difficulty = difficulty;
  state.grid = sudoku.generate(difficulty)
    .split('')
    .map(n => (n === '.' ? emptyCell : { type: 'given', value: n }));
  return updateGame(state);
};

export const resetGame = (oldState) => {
  const newState = deepCopyState(oldState);
  newState.grid = newState.grid.map(cell => (cell.type === 'given' ? cell : emptyCell));
  return updateGame(newState);
};

export const cellInput = (oldState, action) => {
  const isNote = action.type === 'CELL_NOTE';

  const actionCell = oldState.grid[action.index];
  if (!'123456789'.includes(action.value)
            || actionCell.type === 'given'
            || (isNote && actionCell.type !== 'notes' && actionCell.value !== '')) {
    return oldState;
  }

  const newState = deepCopyState(oldState);
  const updateCell = newState.grid[action.index];

  if (!isNote) {
    // We might be changing back from notes, so set the type explicitly
    updateCell.type = 'normal';
    updateCell.value = action.value;
  } else {
    // If we're changing to notes, start with an empty array
    if (updateCell.type !== 'notes') {
      updateCell.type = 'notes';
      updateCell.value = [];
    }

    updateCell.value[action.value - 1] = !updateCell.value[action.value - 1];
  }

  return updateGame(newState);
};

export const cellHint = (oldState, index) => {
  const gridString = oldState.grid.map(c => c.type === 'given' ? String(c.value) : '.').join('');
  const solvedGrid = sudoku.solve(gridString).split('');

  const newState = deepCopyState(oldState);
  newState.grid[index].type = 'given';
  newState.grid[index].value = solvedGrid[index];

  return updateGame(newState);
}
