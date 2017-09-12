import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigateTo: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
};

class SongsHeaderGenres extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = { expanded: false };
  }

  onClick() {
    this.setState(state => ({
      expanded: !state.expanded,
    }));
  }

  render() {
    const { expanded } = this.state;
    const { genre, genres, navigateTo, time } = this.props;

    return (
      <div className={`songs-header__genres ${expanded ? 'songs-header__genres--expanded' : ''}`}>
        <div
          className="songs-header__genres__active"
          onClick={this.onClick}
          role="button"
          tabIndex="0"
        >
          {genre || 'genre'}
        </div>
        <div className="songs-header__genres__main">
          {genres.map(g => (
            <div className={`songs-header__genre ${g.key === genre ? 'songs-header__genre--active' : ''}`} key={g.key}>
              <Link
                className="songs-header__genre__text"
                navigateTo={navigateTo}
                onClick={this.onClick}
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
  }
}

SongsHeaderGenres.propTypes = propTypes;

export default SongsHeaderGenres;
