import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired,
};

const WaveformEvents = ({ isActive, onMouseMove, playSong, seek }) => {
  if (isActive) {
    return (
      <div
        className="waveform__events"
        onMouseDown={seek}
        onMouseMove={onMouseMove}
        role="button"
        tabIndex="0"
      />
    );
  }

  return (
    <div
      className="waveform__events"
      onMouseDown={playSong}
      role="button"
      tabIndex="0"
    />
  );
};

WaveformEvents.propTypes = propTypes;

export default WaveformEvents;
