/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import store from './store';
import { onDifficultyChange, onInputKeydown, onReset, onToggleNotes } from './eventListeners';
import render from './render';

const buildGridHTML = () => {
  let gridHTML = '<tbody>';
  for (let y = 0; y < 9; y += 1) {
    gridHTML += '<tr>';
    for (let x = 0; x < 9; x += 1) {
      gridHTML += '<td class="cell"></td>';
    }
    gridHTML += '</tr>';
  }
  gridHTML += '</tbody>';
  return gridHTML;
};

const buildCellHTML = () => {
  let cellHTML = '<input type="number" class="cell-input">';
  cellHTML += '<div class="cell-notes">';

  for (let i = 1; i < 10; i += 1) {
    if (i % 3 === 1) {
      cellHTML += '<p>';
    }

    cellHTML += `<span>${i}</span>`;

    if (i % 3 === 0) {
      cellHTML += '</p>';
    }
  }

  cellHTML += '</div>';
  return cellHTML;
};

const init = () => {
  // Create the 'sudokuGrid' table
  document.querySelector('#sudokuGrid').innerHTML = buildGridHTML();

  const cells = [...document.querySelectorAll('#sudokuGrid td')];

  // Layout is starting to take longer, so do the cells last
  for (let i = 0; i < cells.length; i += 1) {
    cells[i].id = `c${i}`;
    cells[i].innerHTML = buildCellHTML();
    // add id/listeners to child input
    cells[i].childNodes[0].id = `i${i}`;
    cells[i].childNodes[0].className = 'cell-input';
    cells[i].childNodes[0].addEventListener('keydown', onInputKeydown);
  }

  render();
  store.subscribe(render);

  document.getElementsByClassName('resetButton')[0].addEventListener('click', onReset);
  document.getElementsByClassName('notesButton')[0].addEventListener('click', onToggleNotes);
  document.getElementById('difficultySelect').addEventListener('change', onDifficultyChange);
  document.getElementById('i0').focus();
};

init();
