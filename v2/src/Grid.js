/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';
import styles from './Grid.module.css';
import Notes from './Notes';

/*
  Cell functional component.
*/
const Cell = (props) => (
  <td className={props.className}
    // Cells of type 'given' cannot be modified, so no click listener
    onClick={props.type === 'given' ? () => {} : props.onClick}
  >
    {props.value}
  </td>
);

class Grid extends Component {

  /*
    Renders a single Cell.
  */
  renderCell(column, row) {
    const index = row * 9 + column; // Get the 1D cell index from row and column indices
    const {type, value} = this.props.grid[index];

    if (type === 'notes') {
      return (
        <Notes 
          onClick={() => this.props.onClick(index)}
          notes={value}
          key={index}
        />          
      )
    }

    // Use cell type to determine CSS class
    const cellClass = styles.cell + ' ' + styles[type];

    return (
      <Cell className={cellClass}
        onClick={() => this.props.onClick(index)}
        type={type}
        value={value}
        key={index}
      />
    );
  }

  /*
    Renders the Sudoku Grid.
  */
  renderGrid() {
    // Create an array to hold the grid
    let grid = [];

    // For each row,
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) { 
      // Create an array to hold the cells in this row
      let cells = [];
      // For each column,
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        // Add a cell to the row
        cells.push(this.renderCell(columnIndex, rowIndex));
      }
      // Add this row of cells to the grid
      grid.push(<tr key={rowIndex}>{cells}</tr>)
    }

    return grid;
  }

  render() {
    return (
      <table className={styles.grid}>
        <tbody>
          {this.renderGrid()}
        </tbody>
      </table>
    );
  }
}

export default Grid;
