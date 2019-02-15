/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

// Default value for a cell whose value is not given by the generator
const emptyCell = {type: 'normal', value: null};

/*
  Generate a new Sudoku puzzle with the desired number of cells filled in.

  The generator returns a puzzle as a UInt8Array that contains either the digit
  or a zero for an empty cell.
  All digits in a new game are made into "given" cells that cannot be modified.
  Empty cells are "normal" and can be either filled in with a digit or given
  player-entered "notes" which help keep track of possible digits in a cell.

  A full solution is included in the array after the puzzle, starting at index 81.
*/
export const newGame = (givenCells) => {
  // Disable ESLint, as Module does not exist until runtime
  // eslint-disable-next-line
  const fullPuzzle = Module.generate(givenCells);

  const puzzle = fullPuzzle.slice(0, 81)
  const solution = fullPuzzle.slice(81)

  localStorage.setItem('itsjustagame', JSON.stringify(solution))

  // puzzle is a Uint8Array, so call Array.prototype.map explicitly
  let grid = Array.prototype.map.call(puzzle, value => {
    return value ? {type: 'given', value: '' + value} : {...emptyCell};
  });

  // Set "difficulty" as a non-enumerable property
  grid.difficulty = givenCells;

  return grid;
}

/*
  Get the correct digit for the requested cell by looking at the stored solution.
*/
export const getHint = (index) => {
  const solution = JSON.parse(localStorage.getItem('itsjustagame'))
  return solution[index]
}

/*
  Reset game by removing all non-given cells.
*/
export const resetGame = (grid) => {
  return grid.map(cell => cell.type === 'given' ? cell : emptyCell);
}

/*
  Save the game to localStorage.
*/
export const saveGame = (grid) => {
  localStorage.setItem('sudokuGrid', JSON.stringify(grid));

  // difficulty isn't enumerable, so store it separately
  localStorage.setItem('sudokuDifficulty', JSON.stringify(grid.difficulty));
};

/*
  Load the game from localStorage.
*/
export const loadGame = () => {
  let grid = JSON.parse(localStorage.getItem('sudokuGrid'));

  if (!grid) {
    return null;
  }

  grid.difficulty = JSON.parse(localStorage.getItem('sudokuDifficulty'));
  return grid;
};

/*
  Load game or create new game. Runs on startup.
*/
export const loadOrCreateGame = () => {
  return loadGame() || newGame(53);
}