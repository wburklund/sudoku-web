/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license. See LICENSE file
    in the project root for full license information.
*/

function updateConflicts(grid) {
  grid.forEach((cell) => {
    if (cell.class === 'conflict') {
      cell.class = 'normal';
    }
  });
  for (let i = 0; i < 9; i++) {
    _markConflictsForRow(grid, i);
    _markConflictsForColumn(grid, i);
    _markConflictsForBox(grid, i);
  }
}

function _markConflictsForRow(grid, row) {
  const startCellIndex = 9 * row;
  const cellRow = grid.slice(startCellIndex, startCellIndex + 9);
  _markConflicts(cellRow);
}

function _markConflictsForColumn(grid, column) {
  const cellColumn = [];
  for (let row = 0; row < 9; row++) {
    cellColumn.push(grid[9 * row + column]);
  }
  _markConflicts(cellColumn);
}

function _markConflictsForBox(grid, box) {
  const startRow = Math.floor(box / 3) * 3;
  const endRow = startRow + 2;
  const startColumn = (box * 3) % 9;
  const endColumn = startColumn + 2;

  const cellBox = grid.filter((cell, index) => index % 9 >= startRow && index % 9 <= endRow
            && Math.floor(index / 9) >= startColumn && Math.floor(index / 9) <= endColumn);

  _markConflicts(cellBox);
}

function _markConflicts(cellSet) {
  const values = cellSet.map(c => c.value);

  const conflicts = '123456789'
    .split('')
    .filter(d => values.indexOf(d) !== values.lastIndexOf(d));

  cellSet.forEach((c, index) => {
    if (conflicts.includes(c.value) && c.class !== 'given') {
      c.class = 'conflict';
    }
  });
}

export default updateConflicts;
