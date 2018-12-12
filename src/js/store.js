/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import { createStore } from 'redux';
import * as reducers from './reducers';

const initStore = () => {
  const savedState = JSON.parse(localStorage.getItem('sudoku_saved_game'));
  return savedState || reducers.newGame('medium');
};

const rootReducer = (oldState, action) => {
  switch (action.type) {
    case 'NEW_GAME':
      return reducers.newGame(action.value);
    case 'RESET_GAME':
      return reducers.resetGame(oldState);
    case 'CELL_NOTE':
    case 'CELL_INPUT':
      return reducers.cellInput(oldState, action);
    default:
      return oldState;
  }
};

export default createStore(rootReducer, initStore());
