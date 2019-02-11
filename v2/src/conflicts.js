/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import { deepCopyGrid } from "./util";

// Sets of interacting cells (rows, columns, boxes)
let cellSets;

// Creates cellSets array; runs once
const createCellSets = () => {
    cellSets = [];

    for (let row = 0; row < 9; row++) {
        let set = [];
        for (let col = 0; col < 9; col++) {
            set.push((row * 9) + col);
        }
        cellSets.push(set);
    }
    
    for (let col = 0; col < 9; col++) {
        let set = [];
        for (let row = 0; row < 9; row++) {
            set.push((row * 9) + col);
        }
        cellSets.push(set);
    }
    
    for (let box = 0; box < 9; box++) {
        let startCol = (box % 3) * 3;
        let startRow = 3 * Math.floor(box / 3);
    
        let set = [];
        for (let row = startRow; row < startRow + 3; row++) {
            for (let col = startCol; col < startCol + 3; col++) {
                set.push((row * 9) + col);
            }
        }
        cellSets.push(set);
    }
}

/*
    Takes a grid as input, and returns a grid with the conflicting cells marked.
*/
const updateConflicts = (grid) => {
    if (!cellSets) {
        createCellSets();
    }

    let conflictCells = new Set();

    // Run through each interacting set of cells.
    for (let set of cellSets) {
        const cellValues = set.map(index => grid[index].value);

        // Get an array of digits that occur more than once in the set.
        const conflictDigits = '123456789'
            .split('')
            .filter(d => cellValues.indexOf(d) !== cellValues.lastIndexOf(d));

        // Run through the set, and check whether each cell's value occurs in the array.
        // If so, add its index to the Set of conflicting cells.
        for (let index of set) {
            if (conflictDigits.includes(grid[index].value) && grid[index].type !== 'given') {
                conflictCells.add(index);
            }
        }
    }

    // Get a copy of the grid to mutate
    let newGrid = deepCopyGrid(grid);

    // Reset conflicts
    for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i].type === 'conflict') {
            newGrid[i].type = 'normal';
        }
    }

    // Mark each conflict cell
    for (let index of conflictCells) {
        newGrid[index].type = 'conflict';
    }

    return newGrid;
}

export default updateConflicts;
