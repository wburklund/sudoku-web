const path = require('path');

module.exports = {
  entry: './src/js/game.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};