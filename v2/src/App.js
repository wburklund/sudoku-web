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
    const newGame = lib.newGame('medium');
    this.state = {
      controls: {
        hint: false,
      },
      grid: newGame,
      input: {
        digit: null,
        noteEnable: false,
      },
    };
  }

  handleCellClick(index) {
    // Todo: add note support
    let grid = this.state.grid.slice();
    if (grid[index].type === 'given') {
      return;
    }
    if (this.state.controls.hint) {
      grid[index].value = lib.getHint(grid, index);
      this.setState({ controls: {...this.state.controls, hint: false} });
    } else {
      grid[index].value = this.state.input.digit;
    }
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
