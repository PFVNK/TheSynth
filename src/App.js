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
      synthvalue: 'Synth'
    }

    // tone.js build
    this.synth = this.state.synth
    this.vol = new Tone.Volume(0)
    this.synth.chain(this.vol, Tone.Master)

    this.handleClickOctave = this.handleClickOctave.bind(this)
    this.updateSynthType = this.updateSynthType.bind(this)
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

  get defaultSettings() {
    return {
      Synth: {
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0.1,
          decay: 0.5,
          sustain: 0.9,
          release: 2
        }
      }
    }
  }

  updateSynthType(synthType) {
    if (this.state.synth) {
      this.state.synth.disconnect()
      this.state.synth.dispose()
    }

    let settings = this.defaultSettings[this.state.synthvalue]
    if (settings !== 'undefined') {
      this.setState({
        synth: new Tone[synthType](settings),
        synthvalue: synthType
      })
    }
    console.log(this.state.synth)
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

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Sidebar
            synthvalue={this.state.synthvalue}
            updateSynthType={this.updateSynthType}
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
