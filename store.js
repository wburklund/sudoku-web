const store = Redux.createStore(_sudokuStore);

function _sudokuStore(oldState = _newGame("medium"), action) {
    let state = JSON.parse(JSON.stringify(oldState));
    
    switch (action.type) {
        case 'SAVE_GAME':
            localStorage.setItem('sudoku_saved_game', JSON.stringify(state));
            return state;
        case 'LOAD_GAME':
            const savedState = JSON.parse(localStorage.getItem('sudoku_saved_game'));
            return savedState || state;
        case 'RESET_GAME':
            state.board = state.board.map(cell =>
                cell.class === 'given' ? cell : { class: 'normal', value: '' }
            );
            return state;
        case 'CELL_INPUT':
            if (!'123456789'.includes(action.value)
            || state.board[action.index].class === 'given') {
                return state;
            }
            state.board[action.index].value = action.value;
            break;
        case 'DIFFICULTY_CHANGE':
            state = _newGame(action.value);
            break;
    }
    updateConflicts(state.board);
    return state;
}

function _newGame(difficulty) {
    let state = {};
    state.difficulty = difficulty;
    state.board = sudoku.generate(difficulty)
        .split('')
        .map(n => {
            return {
                class: (n === '.' ? 'normal' : 'given'),
                value: (n === '.' ? '' : n),
            }
        });
    return state;
}
