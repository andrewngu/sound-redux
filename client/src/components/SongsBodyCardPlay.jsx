/* global document */
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
};

const SongsBodyCardPlay = ({ index, isActive, isPlaying, playlist, playSong }) => {
  if (isActive) {
    return (
      <div
        className="songs-body-card__play songs-body-card__play--active"
        role="button"
        tabIndex="0"
        onClick={() => {
          const audioElement = document.getElementById('audio');
          if (isPlaying) {
            audioElement.pause();
          } else {
            audioElement.play();
          }
        }}
      >
        <i className={`songs-body-card__play__icon ion-${isPlaying ? 'radio-waves' : 'ios-play'}`} />
      </div>
    );
  }

  return (
    <div
      className="songs-body-card__play"
      role="button"
      tabIndex="0"
      onClick={() => playSong(playlist, index)}
    >
      <i className="songs-body-card__play__icon ion-ios-play" />
    </div>
  );
};

SongsBodyCardPlay.propTypes = propTypes;

export default SongsBodyCardPlay;
