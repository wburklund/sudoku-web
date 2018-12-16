import React, { Component } from 'react';

class InputBar extends Component {
    render() {
        return (
            <React.Fragment>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(null)}>E</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(1)}>1</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(2)}>2</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(3)}>3</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(4)}>4</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(5)}>5</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(6)}>6</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(7)}>7</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(8)}>8</button>
                <button className={'cell'} onClick={() => this.props.onDigitSelect(9)}>9</button>
                <button className={'cell'} onClick={this.props.onNoteToggle}>N</button>
            </React.Fragment>
        );
    }
}

export default InputBar;