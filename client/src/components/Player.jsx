import PropTypes from 'prop-types';
import React from 'react';
import audio from '../components/audio';
import Slider from '../components/Slider';
import { formatSeconds } from '../utils/NumberUtils';

const propTypes = {
  changeVolume: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playNextSongFromButton: PropTypes.func.isRequired,
  playPrevSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
  togglePlay: PropTypes.func.isRequired,
  toggleRepeat: PropTypes.func.isRequired,
  toggleShuffle: PropTypes.func.isRequired,
};

const Player = ({
  changeVolume,
  player,
  playNextSongFromButton,
  playPrevSong,
  song,
  togglePlay,
  toggleRepeat,
  toggleShuffle,
}) => {
  const { currentTime, duration, isPlaying, repeat, shuffle, volume } = player;
  const { artworkUrl, title, user } = song;
  const { username } = user;

  return (
    <div className="player">
      <div className="player__inner container">
        <div className="player__section">
          <div className="player__song">
            <div className="player__song__artwork" style={{ backgroundImage: `url(${artworkUrl})` }} />
            <div className="player__song__main">
              <div className="player__song__title">
                {title}
              </div>
              <div className="player__song__username">
                {username}
              </div>
            </div>
          </div>
        </div>
        <div className="player__section">
          <div className="player__buttons">
            <div
              className="player__button"
              onClick={playPrevSong}
              role="button"
              tabIndex="0"
            >
              <i className="player__button__icon ion-ios-rewind" />
            </div>
            <div
              className="player__button"
              onClick={togglePlay}
              role="button"
              tabIndex="0"
            >
              <i className={`player__button__icon ion-ios-${isPlaying ? 'pause' : 'play'}`} />
            </div>
            <div
              className="player__button"
              onClick={playNextSongFromButton}
              role="button"
              tabIndex="0"
            >
              <i className="player__button__icon ion-ios-fastforward" />
            </div>
          </div>
        </div>
        <div className="player__section player__section--flex">
          <Slider
            max={duration}
            onChange={() => {}}
            value={currentTime}
          />
        </div>
        <div className="player__section">
          <div className="player__time">
            {formatSeconds(currentTime)}
            <div className="player__time__separator">
              /
            </div>
            {formatSeconds(duration)}
          </div>
        </div>
        <div className="player__section">
          <div className="player__buttons">
            <div
              className={`player__button ${repeat ? 'player__button--active' : ''}`}
              onClick={toggleRepeat}
              role="button"
              tabIndex="0"
            >
              <i className="player__button__icon ion-loop" />
            </div>
            <div
              className={`player__button ${shuffle ? 'player__button--active' : ''}`}
              onClick={toggleShuffle}
              role="button"
              tabIndex="0"
            >
              <i className="player__button__icon ion-shuffle" />
            </div>
            <div className="player__button">
              <i className="player__button__icon ion-android-list" />
            </div>
            <div className="player__button">
              <i className="player__button__icon ion-android-volume-mute" />
            </div>
          </div>
        </div>
        <div className="player__section player__section--volume">
          <Slider
            max={1}
            onChange={changeVolume}
            value={volume}
          />
        </div>
      </div>
    </div>
  );
};

Player.propTypes = propTypes;

export default audio(Player);
