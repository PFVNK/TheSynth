import React, { Component } from 'react';
import '../App.sass';


class Pad extends Component {

    render() {
        return (
            <div
                className="pad"
                id={this.props.id}
                tabIndex="0"
            />
        );
    }
}


export default Pad

