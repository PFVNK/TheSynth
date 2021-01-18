import React, { Component } from 'react';
import '../App.scss';


class Pad extends Component {

    render() {
        const { id } = this.props
        return (
            <div
                className='pad'
                id={id}
                tabIndex='0'
            />
        );
    }
}


export default Pad

