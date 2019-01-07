import React, { Component } from 'react'
import Tone from 'tone'
import '../App.sass';

import Pad from '../Components/Pad'


class Pads extends Component {
    constructor(props) {
        super(props);

        // tone.js build
        this.synth = new Tone.Synth().toMaster()
        this.vol = new Tone.Volume(0)
        this.synth.chain(this.vol, Tone.Master)

        // bindings
        this.onDownKey = this.onDownKey.bind(this)
        this.onUpKey = this.onUpKey.bind(this)

        this.padCodes = [
            {
                key: 'a',
                note: 'C'
            },
            {
                key: 'w',
                note: 'Cb'
            },
            {
                key: 's',
                note: 'D'
            },
            {
                key: 'e',
                note: 'Db'
            },
            {
                key: 'd',
                note: 'E'
            },
            {
                key: 'f',
                note: 'F'
            },
            {
                key: 't',
                note: 'Fb'
            },
            {
                key: 'g',
                note: 'G'
            },
            {
                key: 'y',
                note: 'Gb'
            },
            {
                key: 'h',
                note: 'A'
            },
            {
                key: 'u',
                note: 'Ab'
            },
            {
                key: 'j',
                note: 'B'
            },
        ];

        this.state = {
            pads: [<Pad key={1} />],
            activeNote: '',
            pressed: false,
            clicked: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(`next props ${nextProps.octave}`)
        console.log(this.props.octave)
    }

    componentDidUpdate() {

    }

    onDownKey(note) {
        console.log(`${note} played`);
        this.synth.triggerAttack(note);
    }

    onUpKey(note) {
        this.synth.triggerRelease(note);
    }


    async componentDidMount() {
        let newPads = await this.createPads()
        this.setState({
            pads: newPads
        })

        document.addEventListener('keydown', e => {
            let index = this.state.pads.findIndex(item => item.key === e.key)
            if (this.state.pressed === false && this.state.pads[index] !== undefined) {
                this.onDownKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                this.setState({
                    activeNote: this.state.pads[index].note,
                    pressed: true
                })
            }
        })
        document.addEventListener('keyup', e => {
            this.onUpKey(this.state.activeNote)
            this.setState({
                activeNote: '',
                pressed: false
            })
        })
        document.addEventListener('mousedown', e => {
            let index = this.state.pads.findIndex(item => item.props.id === parseInt(e.target.id))
            if (this.state.clicked === false && this.state.pads[index] !== undefined) {
                this.onDownKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                this.setState({
                    activeNote: this.state.pads[index].note,
                    clicked: true
                })
            }
        })
        document.addEventListener('mouseup', e => {
            this.onUpKey(this.state.activeNote)
            this.setState({
                activeNote: '',
                clicked: false
            })
        })
    }

    createPads() {
        return new Promise(resolve => {
            let newPadCodes = this.padCodes.map((x, index) => (
                <Pad
                    key={x.key.toString()}
                    id={index}
                    note={`${x.note}`}
                    onDown={this.onDownKey}
                    onUp={this.onUpKey}
                    octave={this.props.octave}
                />
            ))
            resolve(newPadCodes)
        })
    }

    render() {
        return (
            <React.Fragment >
                <h3>TheSynth</h3>
                <div className='pad-grid'>{this.state.pads.length > 0 && this.state.pads}</div>
            </React.Fragment >
        );
    }
}


export default Pads

