import React, { Component } from 'react'
import Tone from 'tone'
import '../App.scss';

import Pad from '../Components/Pad'


class Pads extends Component {
    constructor(props) {
        super(props);

        this.padRef = React.createRef()

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
            clicked: false,
            touched: false
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(e) {

    }

    onDownKey(note) {
        Tone.context.resume().then(() => {
            this.props.synth.triggerAttack(note)
        })
    }

    onUpKey(note) {
        Tone.context.resume().then(() => {
            this.props.synth.triggerRelease(note)
        })
    }


    async componentDidMount() {
        let newPads = await this.createPads()
        this.setState({
            pads: newPads
        })

        this.padRef.current.focus()

        this.padRef.current.addEventListener('keydown', e => {
            console.dir(e)
            if (e.repeat) { return }
            let index = this.state.pads.findIndex(item => item.key === e.key)
            if (this.state.pads[index] !== undefined) {
                this.onDownKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                this.setState({
                    activeNote: this.state.pads[index].props.note,
                    pressed: true
                })
            }
        })
        this.padRef.current.addEventListener('keyup', e => {
            let index = this.state.pads.findIndex(item => item.key === e.key)
            if (this.state.pads[index] === undefined) {
                return
            } else {
                this.onUpKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                this.setState({
                    activeNote: '',
                    pressed: false
                })
            }
        })

        this.padRef.current.addEventListener('mousedown', e => {
            let index = this.state.pads.findIndex(item => item.props.id === parseInt(e.target.id))
            if (this.state.clicked === false && this.state.pads[index] !== undefined) {
                this.onDownKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                console.dir(this.state.pads[index].props.note)
                this.setState({
                    activeNote: this.state.pads[index].props.note,
                    clicked: true
                })
            }
        })
        this.padRef.current.addEventListener('mouseup', e => {
            this.onUpKey(`${this.state.activeNote}${this.props.octave}`)
            this.setState({
                activeNote: '',
                clicked: false
            })
        })

        this.padRef.current.addEventListener('touchstart', e => {
            e.preventDefault()
            let index = this.state.pads.findIndex(item => item.props.id === parseInt(e.target.id))
            if (this.state.touched === false && this.state.pads[index] !== undefined) {
                this.onDownKey(`${this.state.pads[index].props.note}${this.props.octave}`)
                this.setState({
                    activeNote: this.state.pads[index].props.note,
                    touched: true
                })
            }
        }, { passive: false })
        this.padRef.current.addEventListener('touchend', e => {
            e.preventDefault()
            this.onUpKey(`${this.state.activeNote}${this.props.octave}`)
            this.setState({
                activeNote: '',
                touched: false
            })
        }, { passive: false })
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
                <div ref={this.padRef} className='pad-grid'>{this.state.pads.length > 0 && this.state.pads}</div>
            </React.Fragment >
        );
    }
}


export default Pads

