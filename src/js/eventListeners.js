/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/
import store from './store/store';

let enableNotes = false;
let wantsHint = false;

const opacityTransition = (func) => {
  document.getElementById('sudokuGrid').classList.add('invisible');
  setTimeout(() => {
    func();
    document.getElementById('sudokuGrid').classList.remove('invisible');
  }, 350); // CSS .cell-input opacity transition time
};

export const onResetClick = () => store.dispatch({ type: 'RESET_GAME' });

export const onHintClick = (event) => {
  const button = event.target;
  wantsHint = !wantsHint;
  wantsHint ? button.classList.add('enabled') : button.classList.remove('enabled');
};

export const onNotesClick = (event) => {
  enableNotes = !enableNotes;
  event.target.classList.toggle('enabled');
}

export const onInputKeydown = (event) => {
  event.preventDefault();
  // index comes from input id in the form 'i#'
  const index = Number(event.target.id.slice(1));
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
      store.dispatch({ type: enableNotes ? 'CELL_NOTE' : 'CELL_INPUT', index, value: event.key });
      return;
  }

  document.getElementsByClassName('cell-input')[newIndex].focus();
}

export const onInputClick = (event) => {
  if (wantsHint) {
    const index = Number(event.target.id.slice(1));
    wantsHint = false;
    document.getElementsByClassName('hintButton')[0].classList.remove('enabled');
    store.dispatch({ type: 'CELL_HINT', index });
  }
}

export const onDifficultyChange = (event) => {
  const select = event.target;
  if (window.confirm('Start new game?')) {
    opacityTransition(() => store.dispatch({ type: 'NEW_GAME', value: select.value }));
  } else {
    select.value = store.getState().difficulty;
  }
}
