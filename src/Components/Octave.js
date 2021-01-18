import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Octave extends Component {

    render() {
        const { handleClickOctave, octave } = this.props
        return (
            <div>
                <div className='octave-counter'>
                    <div className='control-label'>Octave:</div>
                    <button onClick={() => handleClickOctave('minus')}>-</button>
                    <p>{octave}</p>
                    <button onClick={() => handleClickOctave('plus')}>+</button>
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