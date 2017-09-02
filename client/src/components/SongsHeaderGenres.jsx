import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongsHeaderGenres = ({ genre, genres }) => (
  <div className="songs-header__section songs-header__section--flex">
    {genres.map(g => (
      <div className={`songs-header__genre ${g.key === genre ? 'songs-header__genre--active' : ''}`}>
        {g.key}
      </div>
    ))}
  </div>
);

SongsHeaderGenres.propTypes = propTypes;

export default SongsHeaderGenres;
