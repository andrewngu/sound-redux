/* global document */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import WaveformEvents from '../components/WaveformEvents';
import offsetLeft from '../utils/DomUtils';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.playSong = this.playSong.bind(this);
    this.seek = this.seek.bind(this);
    this.state = {
      seek: 0,
    };
  }

  onMouseMove(e) {
    const seek = ((e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth) * 100;
    this.setState({ seek });
  }

  playSong() {
    const { index, playlist, playSong } = this.props;
    playSong(playlist, index);
  }

  seek() {
    const audioElement = document.getElementById('audio');
    const { seek } = this.state;
    const { song } = this.props;
    const { duration } = song;
    const currentTime = Math.floor((seek / 100) * (duration / 1000));
    audioElement.currentTime = currentTime;
  }

  render() {
    const { seek } = this.state;
    const { className, isActive, player, song } = this.props;
    const { currentTime } = player;
    const { duration, waveformUrl } = song;
    const width = isActive ? (currentTime / (duration / 1000)) * 100 : 0;

    return (
      <div className={`waveform ${isActive ? 'waveform--active' : ''} ${className}`}>
        <div
          className="waveform__image"
          style={{ backgroundImage: `url(${waveformUrl})` }}
        />
        <div className="waveform__bg" style={{ width: `${width}%` }} />
        <div className="waveform__seek-bg" style={{ width: `${seek}%` }} />
        <div className="waveform__hover-icon">
          <i className="ion-ios-play" />
        </div>
        <div className="waveform__hover-bg" />
        <div className="waveform__seek-line" style={{ width: `${seek}%` }} />
        <WaveformEvents
          isActive={isActive}
          onMouseMove={this.onMouseMove}
          playSong={this.playSong}
          seek={this.seek}
        />
      </div>
    );
  }
}

Waveform.defaultProps = defaultProps;
Waveform.propTypes = propTypes;

export default Waveform;
