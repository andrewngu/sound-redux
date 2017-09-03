import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import Waveform from '../components/Waveform';
import { USER_PATH } from '../constants/RouterConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const SongMain = ({ isActive, navigateTo, player, playSong, song }) => {
  const { currentTime } = player;
  const { artworkUrl, duration, user, waveformUrl } = song;
  const { avatarUrl } = user;

  return (
    <div className="song-main">
      <div
        className="song-main__artwork"
        style={{
          backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
        }}
      />
      <div className="song-main__main">
        <div className="song-main__title">
          {song.title}
        </div>
        <div className="song-main__user">
          <div
            className="song-main__user__avatar"
            style={{ backgroundImage: `url(${getImageUrl(avatarUrl)})` }}
          />
          <Link
            className="song-main__user__username"
            navigateTo={navigateTo}
            keys={{ id: String(user.id) }}
            path={USER_PATH}
            route={{ path: ['users', user.id] }}
          >
            {user.username}
          </Link>
        </div>
        <div className="song-main__stats">
          <div className="song-main__stat">
            <i className="song-main__stat__icon ion-play" />
            <span className="song-main__stat__text">
              {addCommas(song.playback_count)}
            </span>
          </div>
          <div className="song-main__stat">
            <i className="song-main__stat__icon ion-chatbubble" />
            <span className="song-main__stat__text">
              {addCommas(song.comment_count)}
            </span>
          </div>
        </div>
        <div className="song-main__description">
          {song.description}
        </div>
      </div>
      <div className="song-main__waveform">
        <Waveform
          currentTime={currentTime}
          duration={duration}
          isActive={isActive}
          playSong={playSong}
          waveformUrl={waveformUrl.replace('https', 'http')}
        />
      </div>
    </div>
  );
};

SongMain.propTypes = propTypes;

export default SongMain;
