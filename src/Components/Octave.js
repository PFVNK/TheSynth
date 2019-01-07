import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Octave extends Component {

    render() {
        return (
            <div>
                <div className='octave-counter'>
                    <div className='control-label'>Octave:</div>
                    <button onClick={() => this.props.handleClickOctave('minus')}>-</button>
                    <p>{this.props.octave}</p>
                    <button onClick={() => this.props.handleClickOctave('plus')}>+</button>
                </div>
            </div>
        )
    }
}


export default Octave;

Octave.propTypes = {
    handleClick: PropTypes.func,
    octave: PropTypes.number
}