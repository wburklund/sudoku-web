import React, { Component } from 'react';

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

    return (<td className={className} onClick={() => this.props.onClick(index)}>{this.props.grid[index]}</td>);
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
