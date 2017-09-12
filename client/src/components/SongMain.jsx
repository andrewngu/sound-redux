import PropTypes from 'prop-types';
import React from 'react';
import ArtworkPlay from '../components/ArtworkPlay';
import Link from '../components/Link';
import Stats from '../components/Stats';
import Waveform from '../components/Waveform';
import { USER_PATH } from '../constants/RouterConstants';
import IMAGE_SIZES from '../constants/ImageConstants';
import getImageUrl from '../utils/ImageUtils';

const propTypes = {
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

const SongMain = ({
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
  const {
    artworkUrl,
    commentCount,
    description,
    favoritingsCount,
    id,
    playbackCount,
    user,
  } = song;
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
        <Stats
          className="song-main__stats"
          commentCount={commentCount}
          favoritingsCount={favoritingsCount}
          id={id}
          isAuthenticated={isAuthenticated}
          liked={liked}
          login={login}
          playbackCount={playbackCount}
          toggleLike={toggleLike}
        />
        <div className="song-main__description">
          {description}
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
