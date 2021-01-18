import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import Tone, { Chorus, Synth, PolySynth } from 'tone'
import debounce from 'lodash/debounce'
import MediaQuery from 'react-responsive'
import './App.scss';

import Pads from './Components/Pads'
import Sidebar from './Components/Sidebar'
import KnobPanel from './Components/KnobPanel'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            octave: 1,
            synth: new PolySynth(4, Tone.Synth),
            monoSynth: new Synth(),
            synthtype: '',
            oscillatortype: 'triangle',
            chorusValue: 0,
            pingPongValue: 0,
            volumeValue: 1
        }

        // tone.js build
        this.synth = this.state.synth
        this.chorus = new Chorus(0, 0, 0)
        this.synth.chain(this.chorus, Tone.Master)

        this.initPolySynth = debounce(this.initPolySynth, 1000)
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
        console.log(this.chorus.delayTime)
        console.log(this.state.chorusValue)
    }


    initPolySynth = () => {
        this.synth = this.state.synth
        this.chorus = new Chorus()
        this.synth.chain(this.chorus, Tone.Master)
        console.dir(this.synth)
    }

    initMonoSynth = () => {
        this.synth = this.state.monoSynth
        this.synth.chain(this.chorus, Tone.Master)
    }

    updateSynthType = synthType => {
        if (this.synth && this.state.synthtype === 'PluckSynth') {
            this.synth.disconnect(this.chorus)
            this.synth.dispose()
        } else if (this.synth && this.state.synthtype !== 'PluckSynth') {
            this.synth.releaseAll()
            this.synth.disconnect(this.chorus)
            this.synth.dispose()
        }

        let settings = this.defaultSettings[this.state.synthtype]
        if (synthType === 'PluckSynth') {
            console.log('plucksynth working')
            this.setState({
                synthtype: synthType,
                monoSynth: new Tone[synthType](settings)
            }, () => { this.initMonoSynth() })
        } else {
            this.setState({
                synthtype: synthType,
                synth: new PolySynth(4, Tone[synthType]).set(settings)
            }, () => { this.initPolySynth() })
        }
    }

    // Sets oscillator type
    updateOscillatorType = oscillatortype => {
        if (this.synth) {
            this.synth.releaseAll()
        }
        if (this.state.synthtype !== 'PluckSynth') {
            this.setState({
                oscillatortype: oscillatortype
            },
                () => {
                    this.synth.voices.forEach((e, i) => {
                        this.synth.voices[i].oscillator.type = oscillatortype
                    })
                }
            )
        } else {
            this.setState({
                oscillatortype: ''
            })
        }
    }

    // Will handle effect changes
    handleChorusChange = newValue => {
        if (newValue < 1) {
            this.setState({
                chorusValue: newValue
            }, () => { this.chorus.wet.value = 0; });
        } else if (newValue > 1) {
            this.setState({
                chorusValue: newValue
            }, () => { this.chorus.wet.value = 5 })
        }
    }

    handlePingPongChange = newValue => {
        this.setState({
            pingPongValue: newValue
        })
    }

    handleClickOctave = action => {
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

    handleVolumeValue = action => {
        switch (action) {
            case 'minus':
                this.setState({ volumeValue: this.state.volumeValue - 1 }, () => { this.synth.voices.forEach((e, i) => { this.synth.voices[i].volume.value = this.state.volumeValue }) })
                break
            case 'plus':
                this.setState({ volumeValue: this.state.volumeValue + 1 }, () => { this.synth.voices.forEach((e, i) => { this.synth.voices[i].volume.value = this.state.volumeValue }) })
                break
            default:
                this.setState({ volumeValue: 1 })
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
                    decay: 0.1,
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
            },
            Chorus: {
                frequency: 1.5,
                delayTime: 3.5,
                depth: 0.7,
                type: 'sine',
                spread: 180
            }
        }
    }

    render() {
        return (
            < React.Fragment >
                <div className="App">
                    <MediaQuery query='(max-width: 900px)'>
                        <Menu>
                            <Sidebar
                                synthvalue={this.state.synthvalue}
                                oscvalue={this.state.oscvalue}
                                updateSynthType={this.updateSynthType}
                                updateOscillatorType={this.updateOscillatorType}
                                octave={this.state.octave}
                                handleClickOctave={this.handleClickOctave}
                                volumeValue={this.state.volumeValue}
                                handleVolumeValue={this.handleVolumeValue}
                            />
                        </Menu>
                    </MediaQuery>
                    <KnobPanel
                        handleChorusChange={this.handleChorusChange}
                        handlePpdChange={this.handlePpdChange}
                    />
                    <MediaQuery query='(min-width: 900px)'>
                        <Sidebar
                            synthvalue={this.state.synthvalue}
                            oscvalue={this.state.oscvalue}
                            updateSynthType={this.updateSynthType}
                            updateOscillatorType={this.updateOscillatorType}
                            octave={this.state.octave}
                            handleClickOctave={this.handleClickOctave}
                            volumeValue={this.state.volumeValue}
                            handleVolumeValue={this.handleVolumeValue}
                        />
                    </MediaQuery>

                    <Pads
                        synth={this.state.synth}
                        monosynth={this.state.monoSynth}
                        synthtype={this.state.synthtype}
                        octave={this.state.octave}
                    />
                </div>
            </React.Fragment >
        );
    }
}


export default App;
