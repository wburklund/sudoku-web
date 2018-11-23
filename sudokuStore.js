function sudokuUpdate(oldState, action) {
    if (oldState === undefined) {
        return _newGame('medium');
    }
    
    let state = JSON.parse(JSON.stringify(oldState));
    
    switch (action.type) {
        case 'CELL_INPUT':
            if (!sudoku.DIGITS.includes(action.value)) {
                return state;
            }
            state[action.index].value = action.value;
        default:
            return state;
    }
}

function _newGame(difficulty) {
    return sudoku.generate(difficulty)
        .split('')
        .map(n => {
            return {
                type: (n === '.' ? 'normal' : 'given'),
                value: (n === '.' ? '' : n),
            }
        });
}

  let sudokuStore = Redux.createStore(sudokuUpdate);
