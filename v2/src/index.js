/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Once the WebAssembly Sudoku generator module is initialized,
// Bind the module, then start the app
// Need to disable eslint for this line, because SudokuGen only exists at runtime
// eslint-disable-next-line
SudokuGen().then((Module) => {
    window.Module = Module;
    ReactDOM.render(<App />, document.getElementById('root'));
});
