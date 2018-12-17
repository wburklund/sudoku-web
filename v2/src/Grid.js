/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';

const Cell = (props) => (
  <td className={props.className}
    onClick={props.type === 'given' ? () => {} : props.onClick}
  >
    {props.value}
  </td>
);

class Grid extends Component {

  renderCell(column, row) {
    let classes = ['cell'];

    if (column === 0) {
      classes.push('cell-left');
    } else if (column % 3 === 2) {
      classes.push('cell-right');      
    }

    if (row === 0) {
      classes.push('cell-top');
    } else if (row % 3 === 2) {
      classes.push('cell-bottom');
    }

    const className = classes.join(' ');
    const index = row * 9 + column;
    const {type, value} = this.props.grid[index];

    return (
      <Cell className={className}
        onClick={() => this.props.onClick(index)}
        type={type}
        value={value}
        key={index}
      />
    );
  }

  renderGrid() {
    let grid = [];

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      let cells = [];
      for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
        cells.push(this.renderCell(columnIndex, rowIndex));
      }

      grid.push(<tr key={rowIndex}>{cells}</tr>)
    }

    return grid;
  }

  render() {
    return (
      <table id="sudokuGrid">
        <tbody>
          {this.renderGrid()}
        </tbody>
      </table>
    );
  }
}

export default Grid;
