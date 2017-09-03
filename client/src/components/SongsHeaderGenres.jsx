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
  <div className="songs-header__section songs-header__section--flex">
    {genres.map(g => (
      <div className="songs-header__genre__wrap">
        <Link
          className={`songs-header__genre ${g.key === genre ? 'songs-header__genre--active' : ''}`}
          key={g.key}
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
);

SongsHeaderGenres.propTypes = propTypes;

export default SongsHeaderGenres;
