import React, { Component } from 'react';

class ControlBar extends Component {
    render() {
        return (
            <button onClick={() => this.props.onHintClick()}>Hint</button>
        );
    }
}

export default ControlBar;
