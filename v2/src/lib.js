/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import sudoku from './generator/sudoku';

const emptyCell = {type: 'normal', value: null};

export const newGame = (difficulty) => {
  return sudoku.generate(difficulty)
    .split('')
    .map(value => value === '.' ? Object.assign({}, emptyCell) : {type: 'given', value});
};

export const getHint = (grid, index) => {
  const gridString = grid.map(cell => cell.type === 'given' ? cell.value : '.')
    .join('');

  const solvedGrid = sudoku.solve(gridString);

  return solvedGrid[index];
}

export const saveGame = (state) => {
  localStorage.setItem('sudokuGame', JSON.stringify(state));
};

export const loadGame = () => {
  return JSON.parse(localStorage.getItem('sudokuGame'));
};
