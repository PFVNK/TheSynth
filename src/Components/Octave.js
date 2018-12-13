import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Octave extends Component {
    render() {
        return (
            <div>
                <div className='octave-counter'>
                    <div>Octave:</div>
                    <button onClick={() => this.props.handleClick('minus')}>-</button>
                    <p>{this.props.octave}</p>
                    <button onClick={() => this.props.handleClick('plus')}>+</button>
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