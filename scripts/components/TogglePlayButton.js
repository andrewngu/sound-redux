import React, {Component, PropTypes} from 'react';

class TogglePlayButton extends Component {
    constructor() {
        super();
        this.togglePlay = this.togglePlay.bind(this);
    }

    togglePlay() {
        const {isPlaying} = this.props;
        const audioElement = document.getElementById('audio');
        if (!audioElement) {
            return;
        }

        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    render() {
        const {isPlaying} = this.props;
        return (
            <div className={'toggle-play-button active' + (isPlaying ? ' is-playing' : '')} onClick={this.togglePlay}>
                <i className='toggle-play-button-icon ion-radio-waves'></i>
                <i className='toggle-play-button-icon ion-ios-play'></i>
            </div>
        );
    }
};

export default TogglePlayButton;
