/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import InputBar from './InputBar';
import * as lib from './lib';

class App extends Component {
  constructor(props) {
    super(props);
    const newGame = lib.newGame('medium');
    this.state = {
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
    grid[index].value = this.state.input.digit;
    this.setState({ grid });
  }

  handleDigitSelect(digit) {
    this.setState({ input: {...this.state.input, digit} });
  }

  handleNoteToggle() {
    this.setState({ input: {...this.state.input, noteEnable: !this.state.noteEnable} });
  }

  render() {
    return (
      <div className="App">
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
