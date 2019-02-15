/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

export const deepCopyGrid = (oldGrid) => {
    let newGrid = [];
    // Loop to deep copy the grid, as it is an Array of Objects
    for (let i = 0; i < oldGrid.length; i++) {
        const type = oldGrid[i].type;
        // value can be either a string (immutable) or an Array (mutable, need to copy each property)
        const value = Array.isArray(oldGrid[i].value) ? [...oldGrid[i].value] : oldGrid[i].value;
        newGrid[i] = { type, value };
    }
    // Copy non-enumerable properties
    newGrid.difficulty = oldGrid.difficulty;
    return newGrid;
}

export const deepCopyState = (state) => {
    const { controls, grid, input } = state;

    // controls and input contain only immutable properties, so copying with spread is fine
    return { controls: {...controls}, grid: deepCopyGrid(grid), input: {...input} };
}
