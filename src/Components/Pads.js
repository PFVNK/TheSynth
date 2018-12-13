import React, { Component } from 'react'
import '../App.sass';
import Tone from 'tone'
import PropTypes from 'prop-types'
import Pad from '../Components/Pad'

class Pads extends React.Component {
    constructor(props) {
        super(props);

        // tone.js build
        this.synth = new Tone.Synth().toMaster();
        this.vol = new Tone.Volume(0);
        this.synth.chain(this.vol, Tone.Master);

        // bindings
        this.onDownKey = this.onDownKey.bind(this);
        this.onUpKey = this.onUpKey.bind(this);
    }

    onDownKey(note) {
        console.log(`${note} played`);
        this.synth.triggerAttack(note);
    }

    onUpKey(note) {
        this.synth.triggerRelease();
    }

    render() {
        const { octave } = this.props
        return (
            <div className="pad-grid">
                <Pad
                    note={`C${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`Db${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`D${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`Eb${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`E${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`F${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`Gb${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`G${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`Ab${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`A${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`Bb${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
                <Pad
                    note={`B${octave}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                />
            </div>
        );
    }
}

export default Pads

Pads.propTypes = {
    octave: PropTypes.number.isRequired
}