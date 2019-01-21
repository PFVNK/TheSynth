import React, { Component } from 'react';
import Tone from 'tone'
import './App.sass';

import Pads from './Components/Pads'
import Octave from './Components/Octave'
import Sidebar from './Components/Sidebar'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      octave: 1,
      synth: new Tone.Synth(),
      synthvalue: 'Synth',
      oscvalue: 'triangle',
      test: 'test1'
    }

    // tone.js build
    this.synth = this.state.synth
    this.vol = new Tone.Volume(0)
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
    document.addEventListener('keyup', e => {

    })
  }

  componentDidUpdate() {
    this.synth = this.state.synth
    this.vol = new Tone.Volume(0)
    this.synth.chain(this.vol, Tone.Master)
  }

  updateSynthType(synthType) {
    if (this.state.synth) {
      this.state.synth.disconnect()
      this.state.synth.dispose()
    }

    let settings = this.defaultSettings[this.state.synthvalue]
    if (settings !== 'undefined') {
      this.setState({
        synthvalue: synthType,
        synth: new Tone[synthType](settings) 
      })
    }
  }

  updateOscillatorType(oscillatortype) {
    this.setState({
        oscvalue: oscillatortype,
    },
    () => {
      let settings = this.defaultSettings[this.state.synthvalue]
      this.setState({ synth: new Tone[this.state.synthvalue](settings) }) 
      }
    )
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
                type: this.state.oscvalue
            },
            envelope: {
                attack: 0.1,
                decay: 0.5,
                sustain: 0.9,
                release: 2
            }
        },
        AMSynth: {
            harmonicity: 3,
            detune: 0,
            oscillator: {
                type: this.state.oscvalue
            },
            envelope: {
                attack: 0.5,
                decay: 0.3,
                sustain: 2,
                release: 0.9
            },
            modulation: {
                type: 'square'
            },
            modulationEnvelope: {
                attack: 0.5,
                decay: 0,
                sustain: 1,
                release: 0.5
            }
        },
        FMSynth: {
            harmonicity: 3,
            modulationIndex: 10,
            detune: 5,
            oscillator: {
                type: this.state.oscvalue
            },
            envelope: {
                attack: 0.01,
                decay: 0.01,
                sustain: 1,
                release: 0.5
            },
            modulation: {
                type: 'square'
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
    return (
      <React.Fragment>
        <div className="App">
          <Sidebar
            synthvalue={this.state.synthvalue}
            oscvalue = { this.state.oscvalue }
            updateSynthType={this.updateSynthType}
            updateOscillatorType = { this.updateOscillatorType }
          />
          <Pads
            synth={this.state.synth}
            octave={this.state.octave}
          />
          <Octave
            octave={this.state.octave}
            handleClickOctave={this.handleClickOctave}
          />
        </div>
      </React.Fragment>
    );
  }
}


export default App;
