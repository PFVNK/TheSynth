import React, { Component } from 'react';
import '../App.sass';
import PropTypes from 'prop-types'


class Pad extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        };

        this.clickedMouse = this.clickedMouse.bind(this);
        this.unClickedMouse = this.unClickedMouse.bind(this);
    }

    clickedMouse(e) {
        this.setState({ clicked: true });
        this.props.onDown(this.props.note);
    }
    unClickedMouse(e) {
        this.setState({ clicked: false });
        this.props.onUp(this.props.note);
    }

    render() {
        return (
            <div
                className='pad'
                onMouseUp={this.unClickedMouse}
                onMouseDown={this.clickedMouse}
            />
        );
    }
}

export default Pad

Pad.propTypes = {
    onDown: PropTypes.func,
    onUp: PropTypes.func,
    note: PropTypes.string
}