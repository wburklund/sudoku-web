/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import store from './store';

//  Set during init()
let cells;
let inputs;

function opacityTransition(func) {
  document.getElementById('sudokuGrid').classList.add('invisible');
  setTimeout(() => {
    func();
    document.getElementById('sudokuGrid').classList.remove('invisible');
  }, 350); // CSS .cell-input opacity transition time
}

function buildGridHTML() {
  let gridHTML = '<tbody>';
  for (let y = 0; y < 9; y += 1) {
    gridHTML += '<tr>';
    for (let x = 0; x < 9; x += 1) {
      gridHTML += '<td class="cell">';
      gridHTML += '<input type="number">';
      gridHTML += '</td>';
    }
    gridHTML += '</tr>';
  }
  gridHTML += '</tbody>';
  return gridHTML;
}

function onInputKeydown(event) {
  event.preventDefault();
  // index comes from input id in the form 'i#'
  const index = Number(this.id.slice(1));
  const x = index % 9;
  const y = Math.floor(index / 9);

  let newIndex;
  switch (event.key) {
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
      store.dispatch({ type: 'CELL_INPUT', index, value: '' });
      return;
    default:
      store.dispatch({ type: 'CELL_INPUT', index: Number(this.id.slice(1)), value: event.key });
      return;
  }

  inputs[newIndex].focus();
}

function onDifficultyChange() {
  if (window.confirm('Start new game?')) {
    opacityTransition(() => store.dispatch({ type: 'NEW_GAME', value: this.value }));
  } else {
    this.value = store.getState().difficulty;
  }
}

function setupControlListeners() {
  document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);
}

function render() {
  const state = store.getState();
  const { grid } = state;

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = grid[i].value;
    inputs[i].className = `cell-input ${grid[i].class}`;
  }

  document.getElementById('difficultySelect').value = state.difficulty;
}

function init() {
  // Create the 'sudokuGrid' table
  document.querySelector('#sudokuGrid').innerHTML = buildGridHTML();

  // Setup each cell
  cells = [...document.querySelectorAll('#sudokuGrid td')];

  for (let i = 0; i < cells.length; i += 1) {
    cells[i].id = `c${i}`;
    // add id/listeners to child input
    cells[i].childNodes[0].id = `i${i}`;
    cells[i].childNodes[0].className = 'cell-input';
    cells[i].childNodes[0].addEventListener('keydown', onInputKeydown); // navigation/deletes
  }

  inputs = cells.map(cell => cell.childNodes[0]);

  setupControlListeners();

  render();
  store.subscribe(render);

  document.getElementById('i0').focus();
}

init();
