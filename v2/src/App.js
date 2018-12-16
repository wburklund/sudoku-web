import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';
import sudoku from './generator/sudoku';

class App extends Component {
  constructor(props) {
    super(props);
    const newGame = sudoku.generate('medium').split('').map(v => v === '.' ? null : v);
    this.state = {
      grid: newGame,
    };
  }
  render() {
    return (
      <div className="App">
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}

export default App;
