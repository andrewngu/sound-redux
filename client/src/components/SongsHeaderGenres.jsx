import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigateTo: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};

const SongsHeaderGenres = ({ genre, genres, navigateTo, time }) => (
  <div className="songs-header__genres">
    <div className="songs-header__genres__active">
      {genre || 'genre'}
    </div>
    <div className="songs-header__genres__main">
      {genres.map(g => (
        <div className="songs-header__genre__wrap" key={g.key}>
          <Link
            className={`songs-header__genre ${g.key === genre ? 'songs-header__genre--active' : ''}`}
            navigateTo={navigateTo}
            options={{
              g: g.key,
              ...time ? { t: time } : {},
            }}
            path={SONGS_PATH}
          >
            {g.key}
          </Link>
        </div>
      ))}
    </div>
  </div>
);

SongsHeaderGenres.propTypes = propTypes;

export default SongsHeaderGenres;
