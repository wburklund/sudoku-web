/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import store from './store';

let cells;
let inputs;

const render = () => {
  if (!cells) { // Init module variables
    cells = [...document.querySelectorAll('#sudokuGrid td')];
    inputs = cells.map(cell => cell.childNodes[0]);
  }

  const state = store.getState();
  const { grid, difficulty } = state;

  for (let i = 0; i < cells.length; i += 1) {
    cells[i].className = `cell ${grid[i].class}`;
    if (grid[i].class === 'notes') {
      const noteSpans = document.querySelectorAll(`#c${i} .cell-notes span`);
      for (let j = 0; j < 9; j++) {
        noteSpans[j].classList = grid[i].value[j] ? 'visible' : '';
      }
    } else {
      inputs[i].value = grid[i].value;
    }
  }

  document.getElementById('difficultySelect').value = state.difficulty;

  if (inputs.every(input => input.value !== '' && input.class !== 'conflict')) {
    alert('Congratulations! You won!');
    store.dispatch({ type: 'NEW_GAME', value: difficulty });
  }
};

export default render;
