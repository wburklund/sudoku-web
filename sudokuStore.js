function sudokuUpdate(state, action) {
    if (state === undefined) {
        return sudoku.generate('medium')
            .split('')
            .map(n => n === '.' ? '' : n);
    }
    switch (action.type) {
        case 'CELL_INPUT':
            state[action.index] = action.value;
        default:
            return state;
    }
  }

  let sudokuStore = Redux.createStore(sudokuUpdate);
