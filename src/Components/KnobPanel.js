import React, { Component } from 'react'
import Knob from '../Components/Knob'

class KnobPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='knob-panel'>
                    <Knob
                        size={55}
                        numTicks={25}
                        degrees={260}
                        min={1}
                        max={100}
                        value={30}
                        color={false}
                        onChange={this.props.handleChange}
                    />
                    <Knob
                        size={55}
                        numTicks={25}
                        degrees={260}
                        min={1}
                        max={100}
                        value={30}
                        color={false}
                        onChange={this.props.handleChange}
                    />
                    <Knob
                        size={55}
                        numTicks={25}
                        degrees={260}
                        min={1}
                        max={100}
                        value={30}
                        color={false}
                        onChange={this.props.handleChange}
                    />
                </div>
            </React.Fragment>
        )
    }
}


export default KnobPanel
