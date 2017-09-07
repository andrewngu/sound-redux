/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
};

class ArtworkPlay extends Component {
  constructor() {
    super();
    this.playSong = this.playSong.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  playSong() {
    const { index, playlist, playSong } = this.props;
    playSong(playlist, index);
  }

  togglePlay() {
    const { isPlaying } = this.props;
    const audioElement = document.getElementById('audio');

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
  }

  render() {
    const { isActive, isPlaying } = this.props;
    return (
      <div
        className={`artwork-play ${isActive ? 'artwork-play--active' : ''}`}
        role="button"
        tabIndex="0"
        onClick={isActive ? this.togglePlay : this.playSong}
      >
        <i className={`artwork-play__icon ion-${isActive && isPlaying ? 'radio-waves' : 'ios-play'}`} />
      </div>
    );
  }
}

ArtworkPlay.propTypes = propTypes;

export default ArtworkPlay;
