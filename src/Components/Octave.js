import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from './SynthContext';


class Octave extends Component {

    render() {
        const { handleClickOctave } = this.context
        return (
            <div>
                <Consumer>
                    {octave => {
                        return (
                            <div className='octave-counter'>
                                <div className='control-label'>Octave:</div>
                                <button onClick={() => handleClickOctave('minus')}>-</button>
                                <p>{octave.octave}</p>
                                <button onClick={() => handleClickOctave('plus')}>+</button>
                            </div>
                        )
                    }}
                </Consumer>
            </div>
        )
    }
}

Octave.contextType = Consumer

export default Octave;

Octave.propTypes = {
    handleClick: PropTypes.func,
    octave: PropTypes.number
}