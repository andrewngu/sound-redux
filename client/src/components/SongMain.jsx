import PropTypes from 'prop-types';
import React from 'react';
import ArtworkPlay from '../components/ArtworkPlay';
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
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const SongMain = ({ isActive, navigateTo, player, playlist, playSong, song }) => {
  const { isPlaying } = player;
  const { artworkUrl, commentCount, playbackCount, user } = song;
  const { avatarUrl, username } = user;

  return (
    <div className={`song-main ${isActive ? 'song-main--active' : ''}`}>
      <div className="song-main__artwork">
        <div
          className="song-main__artwork__image"
          style={{
            backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
          }}
        >
          <ArtworkPlay
            index={0}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
      </div>
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
            keys={{ id: user.id }}
            path={USER_PATH}
          >
            {username}
          </Link>
        </div>
        <div className="song-main__stats">
          <div className="song-main__stat">
            <i className="song-main__stat__icon ion-play" />
            <span className="song-main__stat__text">
              {addCommas(playbackCount)}
            </span>
          </div>
          <div className="song-main__stat">
            <i className="song-main__stat__icon ion-chatbubble" />
            <span className="song-main__stat__text">
              {addCommas(commentCount)}
            </span>
          </div>
        </div>
        <div className="song-main__description">
          {song.description}
        </div>
      </div>
      <Waveform
        className="song-main__waveform"
        index={0}
        isActive={isActive}
        player={player}
        playlist={playlist}
        playSong={playSong}
        song={song}
      />
    </div>
  );
};

SongMain.propTypes = propTypes;

export default SongMain;
