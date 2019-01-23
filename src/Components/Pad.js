import React, { Component } from 'react';
import '../App.scss';


class Pad extends Component {

    render() {
        return (
            <div
                className='pad'
                id={this.props.id}
                tabIndex='0'
            />
        );
    }
}


export default Pad

