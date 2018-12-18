/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';
import styles from './Grid.module.css'

const Cell = (props) => (
  <td className={props.className}
    onClick={props.type === 'given' ? () => {} : props.onClick}
  >
    {props.value}
  </td>
);

class Grid extends Component {

  renderCell(column, row) {
    const index = row * 9 + column;
    const {type, value} = this.props.grid[index];

    return (
      <Cell className={styles.cell}
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
      <table className={styles.grid}>
        <tbody>
          {this.renderGrid()}
        </tbody>
      </table>
    );
  }
}

export default Grid;
