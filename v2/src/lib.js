/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import sudoku from './generator/sudoku';

const emptyCell = {type: 'normal', value: null};

/*
  Generate a new Sudoku puzzle with the given difficulty.

  The generator returns a puzzle as an 81-character string with either a digit
  or a period to represent an empty cell. (example: "3..4.6.21" ...)
  All digits in a new game are made into "given" cells that cannot be modified.
  Empty cells are "normal" and can be either given a digit or given
  player-entered "notes" which record possible digits in a cell.
*/
export const newGame = (difficulty) => {
  // Generator string -> array of characters -> array of cells
  return sudoku.generate(difficulty) 
    .split('')
    .map(value => value === '.' ? {...emptyCell} : {type: 'given', value});
};

/*
  Get the correct digit for the requested cell.

  The generator solves the entire puzzle,
  and the digit at the requested index is returned.
*/
export const getHint = (grid, index) => {
  // Convert our grid back to the generator string format,
  // throwing out everything that wasn't given by the generator
  const gridString = grid.map(cell => cell.type === 'given' ? cell.value : '.')
    .join('');

  // Solve the grid
  const solvedGrid = sudoku.solve(gridString);

  // Return the digit at the given index
  return solvedGrid[index];
}

/*
  Save the game to localStorage.
*/
export const saveGame = (state) => {
  localStorage.setItem('sudokuGame', JSON.stringify(state));
};

/*
  Load the game from localStorage.
*/
export const loadGame = () => {
  return JSON.parse(localStorage.getItem('sudokuGame'));
};
