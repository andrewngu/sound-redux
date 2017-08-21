import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  playSong: PropTypes.func.isRequired,
};

class TogglePlayButton extends Component {
  render() {
    const { isPlaying, togglePlay, isActive, playSong } = this.props;
    const onClickHandler = togglePlay.bind(null, !isPlaying);

    if (!isActive) {
      return (
        <div className="toggle-play-button" onClick={playSong}>
          <i className="toggle-play-button-icon ion-ios-play" />
        </div>
      );
    }

    return (
      <div
        className={`toggle-play-button active ${(isPlaying ? 'is-playing' : '')}`}
        onClick={onClickHandler}
      >
        <i className="toggle-play-button-icon ion-radio-waves" />
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }
}

TogglePlayButton.propTypes = propTypes;

export default TogglePlayButton;
