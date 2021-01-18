import React, { Component } from 'react'
import '../App.scss';

import Tone from 'tone'

class LED extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.fft = new Tone.FFT(256)

        this.canvasRef = React.createRef()
        this.loop = this.loop.bind(this)
    }

    componentDidMount() {
        Tone.connect(this.fft)
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')
        this.loop()
    }

    loop() {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext('2d')
        requestAnimationFrame(this.loop.bind(this))
        const value = this.fft.getValue()
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        ctx.clearRect(0, 0, width, height)
        const lineWidth = 4
        ctx.fillStyle = 'white'
        value.forEach((v, i) => {
            const x = Math.scale(i, 0, value.length, 0, width)
            const barHeight = Math.clamp(Math.scale(v, -100, 0, 0, height), 0, height)
            ctx.fillRect(x, height / 2 - barHeight / 2, 2, barHeight)
            ctx.fill()
        })
    }


    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} className='canvas'></canvas>
            </div>
        )
    }
}


export default LED