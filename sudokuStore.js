function sudokuUpdate(oldState, action) {
    if (oldState === undefined) {
        return sudoku.generate('medium')
            .split('')
            .map(n => n === '.' ? '' : n);
    }
    
    let state = JSON.parse(JSON.stringify(oldState));
    
    switch (action.type) {
        case 'CELL_INPUT':
            if (!sudoku.DIGITS.includes(action.value)) {
                return state;
            }
            state[action.index] = action.value;
        default:
            return state;
    }
  }

  let sudokuStore = Redux.createStore(sudokuUpdate);
