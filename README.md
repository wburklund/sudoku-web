# sudoku-web
**A Sudoku game web application.** Built with HTML, CSS, SCSS, Javascript, and Redux. Licensed under GPLv3.

Uses [sudoku.js](https://github.com/robatron/sudoku.js/) puzzle generator library by [Rob Mcguire](https://github.com/robatron).

[Try it!](http://burklund.us.to/sudoku/)

## Features

**Autosave/Autoload**

As you make changes to the Sudoku grid, the game is saved continually. Whenever you reopen the app, your previous game is loaded.

**Conflict Marking**

Player entries that directly conflict with other entries on the board are colored red. The color changes gradually to discourage blind guessing, but you are still made aware of clear mistakes.

**Notes (Not Yet Available)**

Coming soon, you will be able to take notes in a cell. This will make it easier to keep track of which numbers are possible within a cell.
