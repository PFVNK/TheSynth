import React, { Component } from 'react';
import './App.sass';

import Pads from './Components/Pads'
import Octave from './Components/Octave'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      octave: 1
    }

    this.handleClickOctave = this.handleClickOctave.bind(this)
  }

  handleClickOctave(action) {
    switch (action) {
      case 'minus': this.setState({ octave: this.state.octave - 1 })
        break
      case 'plus': this.setState({ octave: this.state.octave + 1 })
        break
      default: this.setState({ octave: 1 })
        break
    }
  }

  render() {
    return (
      <div className="App">
        <Pads
          octave={this.state.octave}
        />
        <Octave
          octave={this.state.octave}
          handleClick={this.handleClickOctave} />
      </div>
    );
  }
}

export default App;
