function sudokuUpdate(oldState = _newGame("medium"), action) {
    let state = JSON.parse(JSON.stringify(oldState));
    
    switch (action.type) {
        case 'CELL_INPUT':
            if (!sudoku.DIGITS.includes(action.value)) {
                return state;
            }
            state.board[action.index].value = action.value;
            break;
        case 'DIFFICULTY_CHANGE':
            state = _newGame(action.value);
            break;
    }
    return state;
}

function _newGame(difficulty) {
    let state = {};
    state.difficulty = difficulty;
    state.board = sudoku.generate(difficulty)
        .split('')
        .map(n => {
            return {
                type: (n === '.' ? 'normal' : 'given'),
                value: (n === '.' ? '' : n),
            }
        });
    return state;
}

  let sudokuStore = Redux.createStore(sudokuUpdate);
