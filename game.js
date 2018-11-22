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

function buildCellHTML() {
    let cellHTML = '<input type="text" maxlength="1">';
    return cellHTML;
}

document.querySelector('#sudokuBoard').innerHTML = buildBoardHTML();
const cells = [...document.querySelectorAll('#sudokuBoard td')];

cells.forEach((cell, index) => {
    cell.id = 'c' + index;
    cell.innerHTML = buildCellHTML();
})

const inputs = [...document.querySelectorAll('#sudokuBoard td input')];


// *****************************************************
// Temporary rendering code
let __board = sudoku.generate("medium");
__board = __board.split('').map(num => {
    return num === '.' ? '' : num;
});

inputs.forEach((input, index) => {
    input.value = __board[index];
});
// *****************************************************