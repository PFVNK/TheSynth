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
                <div className='sidebar-container'>
                    <div className='sidebar-element'>
                        <div className='led'></div>
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
                                <option value="triangle">Triangle</option>
                                <option value="sawtooth">Sawtooth</option>
                                <option value="sine">Sine</option>
                                <option value="square">Square</option>
                            </select>
                        </div>
                        <div className='sidebar-octave-counter'>
                            <h4>Octave</h4>
                            <button onClick={() => this.props.handleClickOctave('minus')}>-</button>
                            <p>{this.props.octave}</p>
                            <button onClick={() => this.props.handleClickOctave('plus')}>+</button>
                        </div>
                        <div className='sidebar-volume-counter'>
                            <h4>Volume</h4>
                            <button onClick={() => this.props.handleVolumeValue('minus')}>-</button>
                            <p>{this.props.volumeValue}</p>
                            <button onClick={() => this.props.handleVolumeValue('plus')}>+</button>
                        </div>
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