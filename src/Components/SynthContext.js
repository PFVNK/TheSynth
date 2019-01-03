import React, { Component, createContext } from 'react'

const { Provider, Consumer } = createContext()

class SynthProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            octave: 1
        }

        this.handleClickOctave = this.handleClickOctave.bind(this)
    }

    componentDidMount() {
        console.log(`mount oct ${this.state.octave}`)
    }

    componentDidUpdate() {
        console.log(`updated oct ${this.state.octave}`)
    }

    handleClickOctave(action) {
        switch (action) {
            case 'minus':
                this.setState({ octave: this.state.octave - 1 })
                break
            case 'plus':
                this.setState({ octave: this.state.octave + 1 })
                break
            default:
                this.setState({ octave: 1 })
                break
        }
        console.log(`handle octave ${this.state.octave}`)
    }

    render() {
        return (
            <Provider value={{
                octave: this.state.octave,
                handleClickOctave: this.handleClickOctave
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export { SynthProvider }

export default Consumer
