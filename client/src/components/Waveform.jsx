/* global document */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { offsetLeft } from '../utils/MouseUtils';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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

  onMouseLeave() {
    this.setState({ seek: 0 });
  }

  playSong() {
    const { playlist, playSong } = this.props;
    playSong(playlist, 0);
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
      <div className={`waveform ${className}`}>
        <div
          className="waveform__image"
          onMouseLeave={this.onMouseLeave}
          onMouseMove={isActive ? this.onMouseMove : () => {}}
          onClick={isActive ? this.seek : this.playSong}
          role="button"
          style={{ backgroundImage: `url(${waveformUrl})` }}
          tabIndex="0"
        />
        <div className="waveform__bg" style={{ width: `${width}%` }} />
        <div className="waveform__seek-bg" style={{ width: `${seek}%` }} />
        {!isActive ? <div className="waveform__hover-bg" /> : null}
        {!isActive
          ? <div className="waveform__hover-icon"><i className="ion-ios-play" /></div>
          : null
        }
        {seek ? <div className="waveform__seek-line" style={{ width: `${seek}%` }} /> : null}
      </div>
    );
  }
}

Waveform.defaultProps = defaultProps;
Waveform.propTypes = propTypes;

export default Waveform;
