/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Render the App once the WebAssembly module is initialized
// Need to disable eslint for this line, because Module only exists at runtime
// eslint-disable-next-line
Module.onRuntimeInitialized = () => ReactDOM.render(<App />, document.getElementById('root'));
