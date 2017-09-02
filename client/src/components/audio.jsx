import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prepareStreamUrl from '../utils/PlayerUtils';

const audio = (InnerComponent) => {
  const propTypes = {
    loadedMetadata: PropTypes.func.isRequired,
    loadStart: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    prevIndex: PropTypes.number.isRequired,
    nextIndex: PropTypes.number.isRequired,
    shuffleIndex: PropTypes.number.isRequired,
    playlist: PropTypes.string.isRequired,
    playSong: PropTypes.func.isRequired,
    song: PropTypes.shape({}).isRequired,
    timeUpdate: PropTypes.func.isRequired,
    volumeChange: PropTypes.func.isRequired,
  };

  class AudioComponent extends Component {
    constructor() {
      super();
      this.audioElement = null;

      this.changeVolume = this.changeVolume.bind(this);

      this.onEnded = this.onEnded.bind(this);
      this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
      this.onLoadStart = this.onLoadStart.bind(this);
      this.onPause = this.onPause.bind(this);
      this.onPlay = this.onPlay.bind(this);
      this.onTimeUpdate = this.onTimeUpdate.bind(this);
      this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
      const { audioElement } = this;
      audioElement.addEventListener('ended', this.onEnded, false);
      audioElement.addEventListener('loadedmetadata', this.onLoadedMetadata, false);
      audioElement.addEventListener('loadstart', this.onLoadStart, false);
      audioElement.addEventListener('pause', this.onPause, false);
      audioElement.addEventListener('play', this.onPlay, false);
      audioElement.addEventListener('timeupdate', this.onTimeUpdate, false);
      audioElement.addEventListener('volumechange', this.onVolumeChange, false);
    }

    componentWillUnmount() {
      const audioElement = this.audio;
      audioElement.removeEventListener('ended', this.onEnded, false);
      audioElement.removeEventListener('loadedmetadata', this.onLoadedMetadata, false);
      audioElement.removeEventListener('loadstart', this.onLoadStart, false);
      audioElement.removeEventListener('pause', this.onPause, false);
      audioElement.removeEventListener('play', this.onPlay, false);
      audioElement.removeEventListener('timeupdate', this.onTimeUpdate, false);
      audioElement.removeEventListener('volumechange', this.onVolumeChange, false);
    }

    onEnded() {
      const { shuffle } = this.state;
      const { nextIndex, playlist, playSong, shuffleIndex } = this.props;
      playSong(playlist, shuffle ? shuffleIndex : nextIndex);
    }

    onLoadedMetadata() {
      const { audioElement, props } = this;
      const { loadedMetadata } = props;
      loadedMetadata(Math.floor(audioElement.duration));
    }

    onLoadStart() {
      const { loadStart } = this.props;
      loadStart();
    }

    onPlay() {
      const { play } = this.props;
      play();
    }

    onPause() {
      const { pause } = this.props;
      pause();
    }

    onTimeUpdate() {
      const { audioElement, props } = this;
      const { timeUpdate } = props;
      timeUpdate(audioElement.currentTime);
    }

    onVolumeChange() {
      const { audioElement, props } = this;
      const { volumeChange } = props;
      volumeChange(audioElement.volume);
    }

    changeVolume(volume) {
      this.audioElement.volume = volume;
    }

    render() {
      const { song } = this.props;
      const { streamUrl } = song;

      return (
        <div>
          <audio
            ref={(node) => { this.audioElement = node; }}
            src={prepareStreamUrl(streamUrl)}
          />
          <InnerComponent
            {...this.props}
            {...this.state}
            changeVolume={this.changeVolume}
          />
        </div>
      );
    }
  }

  AudioComponent.propTypes = propTypes;

  return AudioComponent;
};

export default audio;
