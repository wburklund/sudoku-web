init();

const cells = [...document.querySelectorAll('.cell')];
const inputs = [...document.querySelectorAll('.cell-input')];

render();
sudokuStore.subscribe(render);

function init() {
    // Create the 'sudokuBoard' table
    document.querySelector('#sudokuBoard').innerHTML = buildBoardHTML();

    // Setup each cell
    [...document.querySelectorAll('#sudokuBoard td')].forEach((cell, index) => {
        cell.id = 'c' + index;
        cell.classList.add("cell");
        cell.innerHTML = buildCellHTML();
        // add listener to child input
        cell.childNodes[0].addEventListener('input', onCellInput);
    });
}

function onCellInput() {
    // index comes from parent cell id in the form 'c#'
    const index = Number(this.parentNode.id.slice(1));
    sudokuStore.dispatch({ type: 'CELL_INPUT', index: index, value: this.value });
}

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
    let cellHTML = '<input type="text" class="cell-input" maxlength="1">';
    return cellHTML;
}

function render() {
    const board = sudokuStore.getState();

    inputs.forEach((input, i) => {
        input.value = board[i];
    });
}