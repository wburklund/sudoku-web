/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import store from './store';
import { onDifficultyChange, onInputKeydown } from './eventListeners';
import render from './render';

const buildGridHTML = () => {
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
};

const init = () => {
  // Create the 'sudokuGrid' table
  document.querySelector('#sudokuGrid').innerHTML = buildGridHTML();

  // Setup each cell
  const cells = [...document.querySelectorAll('#sudokuGrid td')];

  for (let i = 0; i < cells.length; i += 1) {
    cells[i].id = `c${i}`;
    // add id/listeners to child input
    cells[i].childNodes[0].id = `i${i}`;
    cells[i].childNodes[0].className = 'cell-input';
    cells[i].childNodes[0].addEventListener('keydown', onInputKeydown); // navigation/deletes
  }

  render();
  store.subscribe(render);

  document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);
  document.getElementById('i0').focus();
};

init();
