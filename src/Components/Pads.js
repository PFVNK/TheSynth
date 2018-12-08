import React, { Component } from 'react'
import '../App.sass';

export class Pads extends Component {
    render() {
        return (
            <div className='pad-grid'>
                <div className='pad'>1</div>
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
