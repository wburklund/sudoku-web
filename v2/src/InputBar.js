/*
    Copyright (c) Will Burklund. All rights reserved. Licensed under the GPLv3 license.
    See LICENSE file in the project root for full license information.
*/

import React, { Component } from 'react';
import styles from './InputBar.module.css';

class InputBar extends Component {
    render() {
        return (
            <React.Fragment>
                <button 
                    className={styles.cell}
                    onClick={() => this.props.onDigitSelect(null)}
                    style={{color: 'transparent', marginRight: '16px'}}
                >
                    E
                </button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('1')}>1</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('2')}>2</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('3')}>3</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('4')}>4</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('5')}>5</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('6')}>6</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('7')}>7</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('8')}>8</button>
                <button className={styles.cell} onClick={() => this.props.onDigitSelect('9')}>9</button>
                <button 
                    className={styles.cell} 
                    onClick={this.props.onNoteToggle}
                    style={{marginLeft: '16px'}}
                >
                    N
                </button>
            </React.Fragment>
        );
    }
}

export default InputBar;
