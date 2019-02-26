import React, { Component } from 'react'
import '../App.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faCircle } from '@fortawesome/free-solid-svg-icons'

class PlayControls extends Component {
    render() {
        return (
            <div className='play-controls'>
                <div className='play'>
                    <FontAwesomeIcon icon={faPlay} color='#2ecc71' size='2x' />
                </div>
                <div className='stop'>
                    <FontAwesomeIcon icon={faStop} color='white' size='2x' />
                </div>
                <div className='record'>
                    <FontAwesomeIcon icon={faCircle} color='#ff3f34' size='2x' />
                </div>

            </div>
        )
    }
}

export default PlayControls
