/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';
import './App.css';
import ControlBar from './ControlBar';
import Grid from './Grid';
import InputBar from './InputBar';
import * as lib from './lib';

class App extends Component {
  constructor(props) {
    super(props);
    const grid = lib.newGame('medium');  // Todo: replace with "load or generate" helper
    this.state = {
      controls: {         // ControlBar selections
        hint: false,        // Whether the player wants a hint
      },
      grid,               // Sudoku grid
      input: {            // InputBar selections
        digit: null,        // Selected digit
        noteEnable: false,  // Whether to enter the selected digit as a note
      },
    };
  }

  /*
    Input handler called when a non-given cell is clicked.

    Determines whether any special input is desired (hint, note, etc),
    and handles it appropriately. Otherwise, enters selected digit as cell's value.
  */
  handleCellClick(index) {
    // Todo: add note support

    // Copy the grid; will need a helper function for deep copy when notes are added
    let grid = this.state.grid.slice();

    if (this.state.controls.hint) {
      // If the player has requested a hint, set the cell's value with the correct digit
      grid[index].value = lib.getHint(grid, index);
      // Disable hints until the player requests another
      this.setState({ controls: {...this.state.controls, hint: false} });
    } else {
      // Otherwise, this was normal input. Set the cell's value with the selected digit.
      grid[index].value = this.state.input.digit;
    }
    // Todo: conflict detection, saving, etc here
    // Update grid
    this.setState({ grid });
  }

  handleDigitSelect(digit) {
    this.setState({ input: {...this.state.input, digit} });
  }

  handleHintClick() {
    this.setState({ controls: {...this.state.controls, hint: !this.state.controls.hint} });
  }

  handleNoteToggle() {
    this.setState({ input: {...this.state.input, noteEnable: !this.state.noteEnable} });
  }

  render() {
    return (
      <div className="App">
        <ControlBar onHintClick={() => this.handleHintClick()} />
        <Grid grid={this.state.grid} onClick={(index) => this.handleCellClick(index)}/>
        <InputBar
          onDigitSelect={(digit) => this.handleDigitSelect(digit)}
          onNoteToggle={() => this.handleNoteToggle()}
        />
      </div>
    );
  }
}

export default App;
