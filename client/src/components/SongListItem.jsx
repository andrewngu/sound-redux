import PropTypes from 'prop-types';
import React from 'react';
import ArtworkPlay from '../components/ArtworkPlay';
import Link from '../components/Link';
import Stats from '../components/Stats';
import Waveform from '../components/Waveform';
import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import IMAGE_SIZES from '../constants/ImageConstants';
import getImageUrl from '../utils/ImageUtils';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
  toggleLike: PropTypes.func.isRequired,
};

const SongListItem = ({
  index,
  isActive,
  isAuthenticated,
  liked,
  login,
  navigateTo,
  player,
  playlist,
  playSong,
  song,
  toggleLike,
}) => {
  const { isPlaying } = player;
  const { artworkUrl, commentCount, favoritingsCount, id, playbackCount, title, user } = song;
  const { avatarUrl, username } = user;

  return (
    <div className={`song-list__item ${isActive ? 'song-list__item--active' : ''}`}>
      <div className="song-list__item__artwork">
        <div
          className="song-list__item__artwork__image"
          style={{
            backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
          }}
        >
          <ArtworkPlay
            index={index}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
      </div>
      <div className="song-list__item__main">
        <Link
          className="song-list__item__title"
          navigateTo={navigateTo}
          keys={{ id }}
          path={SONG_PATH}
        >
          {title}
        </Link>
        <div className="song-list__item__meta">
          <div className="song-list__item__user">
            <div
              className="song-list__item__user__avatar"
              style={{ backgroundImage: `url(${getImageUrl(avatarUrl)})` }}
            />
            <Link
              className="song-list__item__user__username"
              navigateTo={navigateTo}
              keys={{ id: user.id }}
              path={USER_PATH}
            >
              {username}
            </Link>
          </div>
          <Stats
            className="song-list__item__stats"
            commentCount={commentCount}
            favoritingsCount={favoritingsCount}
            id={id}
            isAuthenticated={isAuthenticated}
            liked={liked}
            login={login}
            playbackCount={playbackCount}
            toggleLike={toggleLike}
          />
        </div>
      </div>
      <Waveform
        className="song-list__item__waveform"
        index={index}
        isActive={isActive}
        player={player}
        playlist={playlist}
        playSong={playSong}
        song={song}
      />
    </div>
  );
};

SongListItem.propTypes = propTypes;

export default SongListItem;
