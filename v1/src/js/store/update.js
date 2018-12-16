/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import updateConflicts from './conflicts';

export default (oldState) => {
  const { difficulty, grid } = oldState;
  const newState = { difficulty, grid: updateConflicts(grid) };

  localStorage.setItem('sudoku_saved_game', JSON.stringify(newState));
  return newState;
};
