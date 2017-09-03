import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import SongsBodyCardPlay from '../components/SongsBodyCardPlay';
import SongHeart from '../components/SongHeart';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { formatSongTitle } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const SongsBodyCard = (props) => {
  const { authed, dispatch, index, isActive, isPlaying, liked, playlist, playSong, song } = props;
  const { artworkUrl, title, user } = song;
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
              dispatch={dispatch}
              route={{ path: ['songs', song.id] }}
              title={title}
            >
              {formatSongTitle(title)}
            </Link>
            <Link
              className="songs-body-card__username"
              dispatch={dispatch}
              route={{ path: ['users', user.id] }}
              title={username}
            >
              {username}
            </Link>
          </div>
          <SongHeart
            authed={authed}
            className="songs-body-card__heart"
            dispatch={dispatch}
            liked={liked}
            songId={song.id}
          />
        </div>
      </div>
    </div>
  );
};

SongsBodyCard.propTypes = propTypes;

export default SongsBodyCard;
