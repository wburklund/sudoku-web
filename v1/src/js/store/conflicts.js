/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import { deepCopyGrid } from './state';

let grid;

const markConflicts = (cellSet) => {
  const values = cellSet.map(c => grid[c].value);

  const conflicts = '123456789'
    .split('')
    .filter(d => values.indexOf(d) !== values.lastIndexOf(d));

  for (let i = 0; i < cellSet.length; i += 1) {
    const thisCell = grid[cellSet[i]];

    if (conflicts.includes(thisCell.value) && thisCell.type !== 'given') {
      thisCell.type = 'conflict';
    }
  }
};

const markConflictsForRow = (row) => {
  const cellRow = [];
  for (let column = 0; column < 9; column += 1) {
    cellRow.push(9 * row + column);
  }
  markConflicts(cellRow);
};

const markConflictsForColumn = (column) => {
  const cellColumn = [];
  for (let row = 0; row < 9; row += 1) {
    cellColumn.push(9 * row + column);
  }
  markConflicts(cellColumn);
};

const markConflictsForBox = (box) => {
  const startRow = Math.floor(box / 3) * 3;
  const endRow = startRow + 2;
  const startColumn = (box * 3) % 9;
  const endColumn = startColumn + 2;

  const cellBox = [];

  for (let row = startRow; row <= endRow; row += 1) {
    for (let column = startColumn; column <= endColumn; column += 1) {
      cellBox.push(9 * row + column);
    }
  }

  markConflicts(cellBox);
};

const updateConflicts = (inputGrid) => {
  grid = deepCopyGrid(inputGrid);

  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i].type === 'conflict') {
      grid[i].type = 'normal';
    }
  }

  for (let i = 0; i < 9; i += 1) {
    markConflictsForRow(i);
    markConflictsForColumn(i);
    markConflictsForBox(i);
  }
  return grid;
};

export default updateConflicts;
