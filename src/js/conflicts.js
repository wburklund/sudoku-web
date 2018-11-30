function updateConflicts(board) {
    board.forEach(cell => {
        if (cell.class === 'conflict') {
            cell.class = 'normal';
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
        return index % 9 >= startRow && index % 9 <= endRow
            && Math.floor(index / 9) >= startColumn && Math.floor(index / 9) <= endColumn;
    });

    _markConflicts(cellBox);
}

function _markConflicts(cellSet) {
    const values = cellSet.map(c => c.value);

    const conflicts = sudoku.DIGITS
        .split('')
        .filter(d => values.indexOf(d) !== values.lastIndexOf(d));

    cellSet.forEach((c, index) => {
        if (conflicts.includes(c.value) && c.class !== 'given') {
            c.class = 'conflict';
        }
    });
}