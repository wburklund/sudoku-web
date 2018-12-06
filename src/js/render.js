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

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = grid[i].value;
    inputs[i].className = `cell-input ${grid[i].class}`;
  }

  document.getElementById('difficultySelect').value = state.difficulty;

  if (inputs.every(input => input.value !== '' && input.class !== 'conflict')) {
    alert('Congratulations! You won!');
    store.dispatch({ type: 'NEW_GAME', value: difficulty });
  }
};

export default render;
