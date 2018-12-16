import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import InputBar from './InputBar';
import sudoku from './generator/sudoku';

class App extends Component {
  constructor(props) {
    super(props);
    const newGame = sudoku.generate('medium').split('').map(v => v === '.' ? null : v);
    this.state = {
      grid: newGame,
      input: {
        digit: null,
        noteEnable: false,
      },
    };
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
        <Grid grid={this.state.grid} />
        <InputBar
          onDigitSelect={(digit) => this.handleDigitSelect(digit)}
          onNoteToggle={() => this.handleNoteToggle()}
        />
      </div>
    );
  }
}

export default App;
