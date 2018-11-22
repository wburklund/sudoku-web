function buildBoardHTML() {
    let boardHTML = '<tbody>';
    for (let y = 0; y < 9; y++) {
        boardHTML += '<tr>';
        for (let x = 0; x < 9; x++) {
            boardHTML += '<td></td>';
        }
        boardHTML += '</tr>';
    }
    boardHTML += '</tbody>';
    return boardHTML;
}

document.querySelector('#sudokuBoard').innerHTML = buildBoardHTML();
const cells = [...document.querySelectorAll('#sudokuBoard td')];

// *****************************************************
// Temporary rendering code
let __board = sudoku.generate("medium");
__board = __board.split('').map(num => {
    return num === '.' ? '' : num;
});

cells.forEach((cell, index) => {
    cell.textContent = __board[index];
});
// *****************************************************