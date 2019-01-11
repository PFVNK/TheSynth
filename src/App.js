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
      synth: new Tone.Synth().toMaster()
    }

    // tone.js build
    this.synth = this.state.synth
    this.vol = new Tone.Volume(0)
    this.synth.chain(this.vol, Tone.Master)

    this.handleClickOctave = this.handleClickOctave.bind(this)
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
    console.log(`this is updated value ${this.state.value}`)
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
            updateSynthType={this.updateSynthType}
            value={this.state.value}
          />
          <Pads
            synth={this.synth}
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
