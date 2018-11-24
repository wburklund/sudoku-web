init();

const cells = [...document.getElementsByClassName('cell')];
const inputs = [...document.getElementsByClassName('cell-input')];
const difficultySelect = document.getElementById('difficultySelect');

render();
store.subscribe(render);

function init() {
    // Create the 'sudokuBoard' table
    document.querySelector('#sudokuBoard').innerHTML = buildBoardHTML();

    // Setup each cell
    [...document.querySelectorAll('#sudokuBoard td')].forEach((cell, index) => {
        cell.id = 'c' + index;
        cell.classList.add("cell");
        cell.innerHTML = buildCellHTML();
        // add id/listener to child input
        cell.childNodes[0].id = 'i' + index;
        cell.childNodes[0].addEventListener('keydown', onInputKeydown);
    });

    document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);
    setupControlListeners();
}

function setupControlListeners() {
    document.getElementById('saveButton').addEventListener('click', () => {
        store.dispatch({ type: 'SAVE_GAME' });
    });
    document.getElementById('loadButton').addEventListener('click', () => {
        if (window.confirm('Load saved game? This will end your current game.')) {
            cellOpacityTransition(() => store.dispatch({ type: 'LOAD_GAME' }));
        }
    });
}

function onInputKeydown(event) {
    // index comes from input id in the form 'i#'
    const index = Number(this.id.slice(1));
    const x = index % 9;
    const y = Math.floor(index / 9);

    let newIndex;
    switch(event.key) {
        case 'ArrowLeft':
            newIndex = 9 * y + ((x - 1) % 9);
            break;
        case 'ArrowUp':
            newIndex = 9 * ((y - 1) % 9) + x;
            break;
        case 'ArrowRight':
            newIndex = 9 * y + ((x + 1) % 9);
            break;
        case 'ArrowDown':
            newIndex = 9 * ((y + 1) % 9) + x;
            break;
        case 'Backspace':
            store.dispatch({ type: 'CELL_INPUT', index: index, value: '' });
            return;
        default:
            store.dispatch({ type: 'CELL_INPUT', index: index, value: event.key });
            return;
    }

    inputs[newIndex].select();
}

function onDifficultyChange() {
    if (window.confirm('Start new game?')) {
        cellOpacityTransition(() => store.dispatch({ type: 'DIFFICULTY_CHANGE', value: this.value}));
    } else {
        this.value = store.getState().difficulty;
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
    const state = store.getState();
    const board = state.board;

    inputs.forEach((input, i) => {
        input.value = board[i].value;
        // TODO: set classlist directly using type
        board[i].type === 'conflict' ? input.classList.add('conflict') : input.classList.remove('conflict');
    });

    difficultySelect.value = state.difficulty;
}

const cellOpacityTransition = (func) => {
    inputs.forEach(input => {
        input.classList.add('invisible');
    })
    setTimeout(() => {
        func();
        inputs.forEach(input => {
            input.classList.remove('invisible');
        })
    }, 350);
}
