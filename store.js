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
    _updateConflicts(state);
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

function _updateConflicts(state) {
    const board = state.board;
    board.forEach(cell => {
        if (cell.type === 'conflict') {
            cell.type = 'normal';
        }
    });
    for (let i = 0; i < 9; i++) {
        _markConflictsForRow(board, i);
        _markConflictsForColumn(board, i);
        _markConflictsForBox(board, i);
    }
}

function _markConflictsForRow(board, row) {
    const startCellIndex = 9 * row;
    const cellRow = board.slice(startCellIndex, startCellIndex + 9);
    _markConflicts(cellRow);
}

function _markConflictsForColumn(board, column) {
    let cellColumn = [];
    for (let row = 0; row < 9; row++) {
        cellColumn.push(board[9 * row + column]);
    }
    _markConflicts(cellColumn);
}

function _markConflictsForBox(board, box) {
    const startRow = Math.floor(box / 3) * 3;
    const endRow = startRow + 2;
    const startColumn = (box * 3) % 9;
    const endColumn = startColumn + 2;

    const cellBox = board.filter((cell, index) => {
        return index >= startRow && index <= endRow
            && index >= startColumn && index <= endColumn;
    });

    _markConflicts(cellBox);
}

function _markConflicts(cellSet) {
    const values = cellSet.map(c => c.value);

    const conflicts = sudoku.DIGITS
        .split('')
        .filter(d => values.indexOf(d) !== values.lastIndexOf(d));

    cellSet.forEach((c, index) => {
        if (conflicts.includes(c.value) && c.type !== 'given') {
            c.type = 'conflict';
        }
    });
}