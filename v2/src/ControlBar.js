import React, { Component } from 'react';

class ControlBar extends Component {
    render() {
        return (
            <React.Fragment>
                <select 
                    onChange={(event) => this.props.onDifficultyChange(Number(event.target.value))}
                    value={this.props.difficulty}
                >
                    <option value="62">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
                    <option value="53">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
                    <option value="44">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
                    <option value="35">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
                    <option value="26">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
                </select>
                <button onClick={() => this.props.onHintClick()}>Hint</button>
                <button onClick={() => this.props.onResetClick()}>Reset</button>
            </React.Fragment>
        );
    }
}

export default ControlBar;
