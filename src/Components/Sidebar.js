import React, { Component } from 'react'


class Sidebar extends Component {

    handleSynthChange = (e) => {
        let synth = e.target.value
        this.props.updateSynthType(synth)
    }

    render() {
        let { value } = this.props
        return (
            <div>
                <div className='sidebar-element'>
                    <h4>SynthType</h4>
                    <select value={value} onChange={this.handleSynthChange}>
                        <option value="Synth">Synth</option>
                        <option value="AMSynth">AMSynth</option>
                        <option value="FMSynth">FMSynth</option>
                        <option value="PluckSynth">PluckSynth</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Sidebar