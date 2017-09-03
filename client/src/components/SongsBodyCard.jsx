import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import Heart from '../components/Heart';
import SongsBodyCardPlay from '../components/SongsBodyCardPlay';
import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { formatSongTitle } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const SongsBodyCard = (props) => {
  const { authed, index, isActive, isPlaying, liked, navigateTo, playlist, playSong, song } = props;
  const { artworkUrl, id, title, user } = song;
  const { avatarUrl, username } = user;

  return (
    <div className={`songs-body-card ${isActive ? 'songs-body-card--active' : ''}`}>
      <div className="songs-body-card__inner">
        <div
          className="songs-body-card__artwork"
          style={{
            backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
          }}
        >
          <SongsBodyCardPlay
            index={index}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
        <div className="songs-body-card__main">
          <div
            className="songs-body-card__avatar"
            style={{
              backgroundImage: `url(${getImageUrl(avatarUrl)})`,
            }}
          />
          <div className="songs-body-card__details">
            <Link
              className="songs-body-card__title"
              keys={{ id }}
              navigateTo={navigateTo}
              path={SONG_PATH}
              title={title}
            >
              {formatSongTitle(title)}
            </Link>
            <Link
              className="songs-body-card__username"
              keys={{ id: user.id }}
              navigateTo={navigateTo}
              path={USER_PATH}
              title={username}
            >
              {username}
            </Link>
          </div>
        </div>
        <Heart
          authed={authed}
          className="songs-body-card__heart popover--right"
          liked={liked}
          songId={song.id}
        />
      </div>
    </div>
  );
};

SongsBodyCard.propTypes = propTypes;

export default SongsBodyCard;
