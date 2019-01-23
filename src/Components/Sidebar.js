import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Sidebar extends Component {

    handleSynthChange = (e) => {
        let synth = e.target.value
        this.props.updateSynthType(synth)
    }

    handleOscillatorChange = (e) => {
        let oscillator = e.target.value
        this.props.updateOscillatorType(oscillator)
    }

    render() {
        let { synthvalue, oscvalue } = this.props
        return (
            <React.Fragment>
                <div className='sidebar-element'>
                    <div className='sidebar-synthtype'>
                        <h4>SynthType</h4>
                        <select value={synthvalue} onChange={this.handleSynthChange}>
                            <option value="Synth">Synth</option>
                            <option value="AMSynth">AMSynth</option>
                            <option value="FMSynth">FMSynth</option>
                            <option value="PluckSynth">PluckSynth</option>
                        </select>
                    </div>
                    <div className='sidebar-oscillatortype'>
                        <h4>OscillatorType</h4>
                        <select value={oscvalue} onChange={this.handleOscillatorChange}>
                            <option value="triangle">triangle</option>
                            <option value="sawtooth">sawtooth</option>
                            <option value="sine">sine</option>
                            <option value="square">square</option>
                        </select>
                    </div>
                    <div className='sidebar-octave-counter'>
                        <h4>Octave</h4>
                        <button onClick={() => this.props.handleClickOctave('minus')}>-</button>
                        <p>{this.props.octave}</p>
                        <button onClick={() => this.props.handleClickOctave('plus')}>+</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Sidebar

Sidebar.propTypes = {
    handleClickOctave: PropTypes.func,
    octave: PropTypes.number
}