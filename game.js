//  Set during init()
let cells;
let inputs;

init();

function init() {
    // Create the 'sudokuBoard' table
    document.querySelector('#sudokuBoard').innerHTML = buildBoardHTML();

    // Setup each cell
    cells = [...document.querySelectorAll('#sudokuBoard td')];
    cells.forEach((cell, index) => setupCell(cell, index));

    inputs = cells.map(cell => cell.childNodes[0]);

    setupControlListeners();

    render();
    store.subscribe(render);

    document.getElementById('i0').focus();
}

function buildBoardHTML() {
    let boardHTML = '<tbody>';
    for (let y = 0; y < 9; y++) {
        boardHTML += '<tr>';
        for (let x = 0; x < 9; x++) {
            boardHTML += '<td class="cell">';
            boardHTML += '<input type="text">';
            boardHTML += '</td>';
        }
        boardHTML += '</tr>';
    }
    boardHTML += '</tbody>';
    return boardHTML;
}

function setupCell(cell, index) {
    cell.id = 'c' + index;
    // add id/listeners to child input
    cell.childNodes[0].id = 'i' + index;
    cell.childNodes[0].className = 'cell-input';
    cell.childNodes[0].addEventListener('keydown', onInputKeydown); // navigation/deletes
    cell.childNodes[0].addEventListener('input', onCellInput);  // validation of input
}

function onInputKeydown(event) {
    // index comes from input id in the form 'i#'
    const index = Number(this.id.slice(1));
    const x = index % 9;
    const y = Math.floor(index / 9);

    let newIndex;
    switch(event.key) {
        case 'ArrowLeft':
        // x and y coordinates need to be positive, so add 8 instead of subtracting 1
            newIndex = 9 * y + ((x + 8) % 9);
            break;
        case 'ArrowUp':
            newIndex = 9 * ((y + 8) % 9) + x;
            break;
        case 'ArrowRight':
            newIndex = 9 * y + ((x + 1) % 9);
            break;
        case 'ArrowDown':
            newIndex = 9 * ((y + 1) % 9) + x;
            break;
        case 'Backspace':
        case 'Delete':
            store.dispatch({ type: 'CELL_INPUT', index: index, value: '' });
            return;
        default:
            store.dispatch({ type: 'CELL_INPUT', index: Number(this.id.slice(1)), value: event.key });
            return;
    }

    inputs[newIndex].focus();
}

function onCellInput() {
    const index = this.id.slice(1);
    this.value = store.getState().board[index].value;
}

function setupControlListeners() {
    document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);

    document.getElementById('saveButton').addEventListener('click', () => {
        store.dispatch({ type: 'SAVE_GAME' });
    });
    
    document.getElementById('loadButton').addEventListener('click', () => {
        if (window.confirm('Load saved game? This will end your current game.')) {
            cellOpacityTransition(() => store.dispatch({ type: 'LOAD_GAME' }));
        }
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        if (window.confirm('Reset game?')) {
            cellOpacityTransition(() => store.dispatch({ type: 'RESET_GAME' }));
        }
    });
}

function onDifficultyChange() {
    if (window.confirm('Start new game?')) {
        cellOpacityTransition(() => store.dispatch({ type: 'DIFFICULTY_CHANGE', value: this.value}));
    } else {
        this.value = store.getState().difficulty;
    }
}

function render() {
    const state = store.getState();
    const board = state.board;

    inputs.forEach((input, i) => {
        input.value = board[i].value;
        input.className = 'cell-input ' + board[i].class;
    });

    document.getElementById('difficultySelect').value = state.difficulty;
}

const cellOpacityTransition = (func) => {
    document.getElementById('sudokuBoard').classList.add('invisible');
    setTimeout(() => {
        func();
        document.getElementById('sudokuBoard').classList.remove('invisible');
    }, 350);    // CSS .cell-input opacity transition time
}
