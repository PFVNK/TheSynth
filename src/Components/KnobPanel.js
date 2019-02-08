import React, { Component } from 'react'
import Knob from '../Components/Knob'

class KnobPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='head-container'>
                    <div className='title'>
                        <h3>TheSynth</h3>
                    </div>
                    <div className='knob-panel'>
                        <Knob
                            size={45}
                            numTicks={25}
                            degrees={260}
                            min={0}
                            max={10}
                            value={3}
                            color={false}
                            onChange={this.props.handleReverbChange}
                        />
                        <Knob
                            size={45}
                            numTicks={25}
                            degrees={260}
                            min={0}
                            max={10}
                            value={3}
                            color={false}
                            onChange={this.props.handlePpdChange}
                        />
                        <Knob
                            size={45}
                            numTicks={25}
                            degrees={260}
                            min={1}
                            max={100}
                            value={30}
                            color={false}
                            onChange={this.props.handleChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default KnobPanel
