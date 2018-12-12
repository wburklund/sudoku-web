import sudoku from './generator/sudoku';
import { deepCopyState, updateGame } from './state';

const emptyCell = { type: 'normal', value: '' };

export const newGame = (difficulty) => {
  const state = {};
  state.difficulty = difficulty;
  state.grid = sudoku.generate(difficulty)
    .split('')
    .map(n => (n === '.' ? emptyCell : { type: 'given', value: n }))
  return updateGame(state);
};

export const resetGame = oldState => {
  const newState = deepCopyState(oldState);
  newState.grid = newState.grid.map(cell => (cell.type === 'given' ? cell : emptyCell));
  return updateGame(newState);
}

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
