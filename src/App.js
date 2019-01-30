import React, { Component } from 'react';
import Tone from 'tone'
import UnmuteButton from 'unmute'
import './App.scss';

import Pads from './Components/Pads'
import Sidebar from './Components/Sidebar'
import KnobPanel from './Components/KnobPanel'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            octave: 1,
            synth: new Tone.Synth(),
            synthtype: 'Synth',
            oscillatortype: 'triangle',
            value: 0,
            ppdValue: 0
        }

        // tone.js build
        this.synth = this.state.synth
        this.vol = new Tone.Volume()
        this.synth.chain(this.vol, Tone.Master)

        this.handleClickOctave = this.handleClickOctave.bind(this)
        this.updateSynthType = this.updateSynthType.bind(this)
        this.updateOscillatorType = this.updateOscillatorType.bind(this)
    }


    componentDidMount() {
        document.addEventListener('keydown', e => {
            if (e.key === 'z') {
                this.setState({ octave: this.state.octave - 1 })
            }
            if (e.key === 'x') {
                this.setState({ octave: this.state.octave + 1 })
            }
        })
    }

    componentDidUpdate() {
        this.synth = this.state.synth
        this.vol = new Tone.Volume()
        this.synth.chain(this.vol, Tone.Master)
    }

    updateSynthType(synthType) {
        if (this.state.synth) {
            this.state.synth.disconnect()
            this.state.synth.dispose()
        }

        let settings = this.defaultSettings[this.state.synthtype]
        this.setState({
            synthtype: synthType,
            synth: new Tone[synthType](settings)
        })
    }

    // Sets oscillator type in defaultsettings
    updateOscillatorType(oscillatortype) {
        this.setState({
            oscillatortype: oscillatortype
        },
            () => {
                this.synth.oscillator.type = oscillatortype
            }
        )
    }

    // Will handle effect changes
    handleReverbChange = newValue => {
        this.setState({
            value: newValue
        });
    };

    handlePpdChange = newValue => {
        this.setState({
            ppdValue: newValue
        })
    }

    handleClickOctave(action) {
        switch (action) {
            case 'minus':
                this.setState({ octave: this.state.octave - 1 })
                break
            case 'plus':
                this.setState({ octave: this.state.octave + 1 })
                break
            default:
                this.setState({ octave: 1 })
                break
        }
    }

    get defaultSettings() {
        return {
            Synth: {
                oscillator: {
                    type: 'triangle'
                },
                envelope: {
                    attack: 0.005,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 1
                }
            },
            AMSynth: {
                oscillator: {
                    type: 'triangle'
                },
                harmonicity: 3,
                detune: 0,
                envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5
                },
                modulation: {
                    type: 'triangle'
                },
                modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                }
            },
            FMSynth: {
                oscillator: {
                    type: 'triangle'
                },
                harmonicity: 3,
                modulationIndex: 10,
                detune: 5,
                envelope: {
                    attack: 0.01,
                    decay: 0.01,
                    sustain: 1,
                    release: 0.5
                },
                modulation: {
                    type: 'triangle'
                },
                modulationEnvelope: {
                    attack: 0.5,
                    decay: 0,
                    sustain: 1,
                    release: 0.5
                }
            },
            PluckSynth: {
                attackNoise: 1,
                dampening: 4000,
                resonance: 0.7
            }
        }
    }

    render() {
        UnmuteButton()
        return (
            < React.Fragment >
                <div className="App">
                    <KnobPanel
                        handleReverbChange={this.handleReverbChange}
                        handlePpdChange={this.handlePpdChange}
                    />
                    <Sidebar
                        synthvalue={this.state.synthvalue}
                        oscvalue={this.state.oscvalue}
                        updateSynthType={this.updateSynthType}
                        updateOscillatorType={this.updateOscillatorType}
                        octave={this.state.octave}
                        handleClickOctave={this.handleClickOctave}
                    />
                    <Pads
                        synth={this.state.synth}
                        octave={this.state.octave}
                    />
                </div>
            </React.Fragment >
        );
    }
}


export default App;
