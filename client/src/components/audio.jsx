import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prepareStreamUrl from '../utils/PlayerUtils';

const propTypes = {
  onLoadedMetadata: PropTypes.func.isRequired,
  onLoadStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playNextSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const audio = (InnerComponent) => {
  class AudioComponent extends Component {
    constructor() {
      super();
      this.audioElement = null;

      this.onEnded = this.onEnded.bind(this);
      this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
      this.onLoadStart = this.onLoadStart.bind(this);
      this.onPause = this.onPause.bind(this);
      this.onPlay = this.onPlay.bind(this);
      this.onTimeUpdate = this.onTimeUpdate.bind(this);
      this.onVolumeChange = this.onVolumeChange.bind(this);

      this.changeVolume = this.changeVolume.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
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
      const { playNextSong } = this.props;
      playNextSong();
    }

    onLoadedMetadata() {
      const { audioElement, props } = this;
      const { onLoadedMetadata } = props;
      onLoadedMetadata(Math.floor(audioElement.duration));
    }

    onLoadStart() {
      const { onLoadStart } = this.props;
      onLoadStart();
    }

    onPlay() {
      const { onPlay } = this.props;
      onPlay();
    }

    onPause() {
      const { onPause } = this.props;
      onPause();
    }

    onTimeUpdate() {
      const { audioElement, props } = this;
      const { onTimeUpdate } = props;
      onTimeUpdate(Math.floor(audioElement.currentTime));
    }

    onVolumeChange() {
      const { audioElement, props } = this;
      const { onVolumeChange } = props;
      onVolumeChange(audioElement.volume);
    }

    changeVolume(volume) {
      this.audioElement.volume = volume;
    }

    togglePlay() {
      const { audioElement } = this;
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }

    render() {
      const { song } = this.props;
      const { streamUrl } = song;

      return (
        <div>
          <audio
            autoPlay
            id="audio"
            ref={(node) => { this.audioElement = node; }}
            src={prepareStreamUrl(streamUrl)}
          />
          <InnerComponent
            {...this.state}
            {...this.props}
            changeVolume={this.changeVolume}
            togglePlay={this.togglePlay}
          />
        </div>
      );
    }
  }

  AudioComponent.propTypes = propTypes;

  return AudioComponent;
};

export default audio;
