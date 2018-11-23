init();

const cells = [...document.getElementsByClassName('cell')];
const inputs = [...document.getElementsByClassName('cell-input')];
const difficultySelect = document.getElementById('difficultySelect');

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

    document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);    
}

function onCellInput() {
    // index comes from parent cell id in the form 'c#'
    const index = Number(this.parentNode.id.slice(1));
    sudokuStore.dispatch({ type: 'CELL_INPUT', index: index, value: this.value });
}

function onDifficultyChange() {
    if (window.confirm('Start new game?')) {
        sudokuStore.dispatch({ type: 'DIFFICULTY_CHANGE', value: this.value});
    } else {
        this.value = sudokuStore.getState().difficulty;
    }
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
    const state = sudokuStore.getState();
    const board = state.board;

    inputs.forEach((input, i) => {
        input.value = board[i].value;
    });

    difficultySelect.value = state.difficulty;
}