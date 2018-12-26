import React, { Component } from 'react';

class ControlBar extends Component {
    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.props.onHintClick()}>Hint</button>
                <button onClick={() => this.props.onResetClick()}>Reset</button>
            </React.Fragment>
        );
    }
}

export default ControlBar;
