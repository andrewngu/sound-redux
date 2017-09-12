import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  audioUrl: PropTypes.string.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onLoadStart: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onVolumeChange: PropTypes.func.isRequired,
  playNextSong: PropTypes.func.isRequired,
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

      this.changeCurrentTime = this.changeCurrentTime.bind(this);
      this.changeVolume = this.changeVolume.bind(this);
      this.toggleMuted = this.toggleMuted.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
    }

    componentDidMount() {
      const { audioElement } = this;
      audioElement.play();
    }

    componentDidUpdate(prevProps) {
      const { audioElement, props } = this;
      const { audioUrl } = props;
      if (prevProps.audioUrl !== audioUrl) {
        audioElement.play();
      }
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
      const { muted, volume } = audioElement;
      const { onVolumeChange } = props;
      onVolumeChange(muted, volume);
    }

    changeCurrentTime(currentTime) {
      this.audioElement.currentTime = currentTime;
    }

    changeVolume(volume) {
      const { audioElement } = this;
      audioElement.muted = false;
      audioElement.volume = volume;
    }

    toggleMuted() {
      const { audioElement } = this;
      const { muted } = audioElement;
      audioElement.muted = !muted;
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
      const { audioUrl } = this.props;

      return (
        <div>
          <audio
            id="audio"
            onEnded={this.onEnded}
            onLoadedMetadata={this.onLoadedMetadata}
            onLoadStart={this.onLoadStart}
            onPause={this.onPause}
            onPlay={this.onPlay}
            onTimeUpdate={this.onTimeUpdate}
            onVolumeChange={this.onVolumeChange}
            ref={(node) => { this.audioElement = node; }}
            src={audioUrl}
          />
          <InnerComponent
            {...this.state}
            {...this.props}
            changeCurrentTime={this.changeCurrentTime}
            changeVolume={this.changeVolume}
            toggleMuted={this.toggleMuted}
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
