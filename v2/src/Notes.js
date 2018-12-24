/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React from 'react';
import styles from './Notes.module.css';

/*
    Notes functional component.

    Players can opt to mark possibilities of values within a cell to aid in
    deduction. The spans here each represent one possibility, and they are
    conditionally visible depending on whether the player has marked that
    number as a possibility in the given cell.

    If the complexity of this component increases, it will need to be
    refactored using nested loops.
*/
const Notes = (props) => (
    <td className={styles.notes}
        onClick={props.onClick}
    >
        <p>
            <span className={props.notes[0] ? styles.visible : ''}>1</span>
            <span className={props.notes[1] ? styles.visible : ''}>2</span>
            <span className={props.notes[2] ? styles.visible : ''}>3</span>
        </p>
        <p>
            <span className={props.notes[3] ? styles.visible : ''}>4</span>
            <span className={props.notes[4] ? styles.visible : ''}>5</span>
            <span className={props.notes[5] ? styles.visible : ''}>6</span>
        </p>
        <p>
            <span className={props.notes[6] ? styles.visible : ''}>7</span>
            <span className={props.notes[7] ? styles.visible : ''}>8</span>
            <span className={props.notes[8] ? styles.visible : ''}>9</span>
        </p>
    </td>
);

export default Notes;
