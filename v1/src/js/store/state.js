/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

export const deepCopyGrid = (oldGrid) => {
  const newGrid = Array(oldGrid.length);

  for (let i = 0; i < oldGrid.length; i += 1) {
    const { type, value } = oldGrid[i];

    if (type === 'notes') {
      newGrid[i] = { type, value: [...value] };
    } else {
      newGrid[i] = { type, value };
    }
  }

  return newGrid;
};

export const deepCopyState = (oldState) => {
  const { difficulty, grid } = oldState;
  return { difficulty, grid: deepCopyGrid(grid) };
};
