import React, { Component } from 'react'
import '../App.sass';
import Tone from 'tone'

export class Pads extends Component {

    render() {
        function triggerNote() {
            const synth = new Tone.Synth()
            synth.toMaster()

            synth.triggerAttackRelease('c4', '8n')

            let notes = ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3']
        }

        return (
            <div className='pad-grid'>
                <div className='pad' onClick={triggerNote}>1</div>
                <div className='pad'>2</div>
                <div className='pad'>3</div>
                <div className='pad'>4</div>
                <div className='pad'>5</div>
                <div className='pad'>6</div>
                <div className='pad'>7</div>
                <div className='pad'>8</div>
                <div className='pad'>9</div>
                <div className='pad'>10</div>
                <div className='pad'>11</div>
                <div className='pad'>12</div>
            </div>
        )
    }
}

export default Pads
