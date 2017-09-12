/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
};

class SongsBodyCardMobileEvents extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { index, isActive, playlist, playSong } = this.props;
    if (isActive) {
      const audioElement = document.getElementById('audio');
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    } else {
      playSong(playlist, index);
    }
  }

  render() {
    return (
      <div
        className="songs-body-card__mobile-events"
        onClick={this.onClick}
        role="button"
        tabIndex="0"
      />
    );
  }
}


SongsBodyCardMobileEvents.propTypes = propTypes;

export default SongsBodyCardMobileEvents;
