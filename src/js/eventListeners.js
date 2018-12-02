import store from './store';

const opacityTransition = (func) => {
  document.getElementById('sudokuGrid').classList.add('invisible');
  setTimeout(() => {
    func();
    document.getElementById('sudokuGrid').classList.remove('invisible');
  }, 350); // CSS .cell-input opacity transition time
};

export function onInputKeydown(event) {
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

  document.getElementsByClassName('cell-input')[newIndex].focus();
}

export function onDifficultyChange() {
  if (window.confirm('Start new game?')) {
    opacityTransition(() => store.dispatch({ type: 'NEW_GAME', value: this.value }));
  } else {
    this.value = store.getState().difficulty;
  }
}
