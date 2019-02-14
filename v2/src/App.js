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
import { deepCopyGrid } from './util';
import updateConflicts from './conflicts';

class App extends Component {
  constructor(props) {
    super(props);
    const grid = lib.loadOrCreateGame();
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
    let grid = deepCopyGrid(this.state.grid);
    const { digit, noteEnable } = this.state.input;

    if (this.state.controls.hint) {
      // If the player has requested a hint, set the cell's value with the correct digit
      grid[index].value = lib.getHint(index);
      grid[index].type = 'given';

      // Disable hints until the player requests another
      this.setState({ controls: {...this.state.controls, hint: false} });
    } else if (noteEnable) {
      // The player wants to input a note; first check whether the cell is already type 'notes'
      if (grid[index].type !== 'notes') {
        // Do nothing if there is already a digit in the cell
        if (grid[index].value !== null) {
          return;
        }
        // Otherwise, make this a 'notes' cell
        grid[index].type = 'notes';
        grid[index].value = [];
      }
      // Now that we're sure the cell is a 'notes' cell, set or unset the appropriate note
      grid[index].value[digit - 1] = !grid[index].value[digit - 1];
    } else {
      // Otherwise, this was normal input. Set the cell's value with the selected digit.
      grid[index].type = 'normal';
      grid[index].value = digit;
    }
    
    grid = updateConflicts(grid);
    lib.saveGame(grid);
    
    // Update grid
    this.setState({ grid });
  }

  handleDifficultyChange(difficulty) {
    this.setState({ grid: lib.newGame(difficulty)})
  }

  handleDigitSelect(digit) {
    this.setState({ input: {...this.state.input, digit} });
  }

  handleHintClick() {
    this.setState({ controls: {...this.state.controls, hint: !this.state.controls.hint} });
  }

  handleNoteToggle() {
    this.setState({ input: {...this.state.input, noteEnable: !this.state.input.noteEnable} });
  }

  handleResetClick() {
    const resetGrid = lib.resetGame(this.state.grid);
    this.setState({ grid: resetGrid });
  }

  render() {
    return (
      <div className="App">
        <header className="heading">
          Sudoku
        </header>
        <ControlBar
          onDifficultyChange={(difficulty) => this.handleDifficultyChange(difficulty)}
          onHintClick={() => this.handleHintClick()} 
          onResetClick={() => this.handleResetClick()}
        />
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
