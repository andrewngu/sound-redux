/* global document */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { offsetLeft } from '../utils/MouseUtils';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  currentTime: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

class Waveform extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.state = {
      seek: 0,
    };
  }

  onClick() {
    const audioElement = document.getElementById('audio');
    const { seek } = this.state;
    const { song } = this.props;
    const { duration } = song;
    const currentTime = Math.floor((seek / 100) * (duration / 1000));
    audioElement.currentTime = currentTime;
  }

  onMouseMove(e) {
    const seek = ((e.clientX - offsetLeft(e.currentTarget)) / e.currentTarget.offsetWidth) * 100;
    this.setState({ seek });
  }

  onMouseLeave() {
    this.setState({ seek: 0 });
  }

  render() {
    const { seek } = this.state;
    const { className, currentTime, isActive, playSong, song } = this.props;
    const { duration, waveformUrl } = song;
    const width = isActive ? (currentTime / (duration / 1000)) * 100 : 0;

    return (
      <div className={`waveform ${className}`}>
        <div
          className="waveform__image"
          onMouseLeave={this.onMouseLeave}
          onMouseMove={isActive ? this.onMouseMove : () => {}}
          onClick={isActive ? this.onClick : playSong}
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
