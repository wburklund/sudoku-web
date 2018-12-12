import sudoku from './generator/sudoku';
import updateConflicts from './conflicts';

const emptyCell = { class: 'normal', value: '' };

const stateUpdate = (oldState, func) => {
  let newState = JSON.parse(JSON.stringify(oldState));

  newState = func(newState);
  newState.grid = updateConflicts(newState.grid);

  localStorage.setItem('sudoku_saved_game', JSON.stringify(newState));
  return newState;
};

export const newGame = (oldState, difficulty) => stateUpdate(oldState, () => {
  const state = {};
  state.difficulty = difficulty;
  state.grid = sudoku.generate(difficulty)
    .split('')
    .map(n => (n === '.' ? emptyCell : { class: 'given', value: n }));
  return state;
});

export const resetGame = oldState => stateUpdate(oldState, (state) => {
  state.grid = state.grid.map(cell => (cell.class === 'given' ? cell : emptyCell));
  return state;
});

export const cellInput = (oldState, action) => {
  const isNote = action.type === 'CELL_NOTE';

  const actionCell = oldState.grid[action.index];
  if (!'123456789'.includes(action.value)
            || actionCell.class === 'given'
            || (isNote && actionCell.class !== 'notes' && actionCell.value !== '')) {
    return oldState;
  }

  if (!isNote) {
    return stateUpdate(oldState, (state) => {
      const updateCell = state.grid[action.index];
      updateCell.class = 'normal';
      updateCell.value = action.value;
      return state;
    });
  }
  return stateUpdate(oldState, (state) => {
    const updateCell = state.grid[action.index];
    if (updateCell.class !== 'notes') {
      updateCell.class = 'notes';
      updateCell.value = [];
    }
    updateCell.value[action.value - 1] = !updateCell.value[action.value - 1];
    return state;
  });
};
