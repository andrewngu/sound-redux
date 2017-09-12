import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  genre: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongsHeaderTimes = ({ genre, navigateTo, search, time, times }) => (
  <div className="songs-header__times">
    <div className="songs-header__times__inner">
      <i className="songs-header__times__icon ion-funnel" />
      {times.map(t => (
        <Link
          className={`songs-header__time ${t.key === time ? 'songs-header__time--active' : ''}`}
          key={t.key}
          navigateTo={navigateTo}
          options={{
            ...time !== t.key ? { t: t.key } : {},
            ...genre ? { g: genre } : {},
            ...search ? { q: search } : {},
          }}
          path={SONGS_PATH}
        >
          {t.label}
        </Link>
      ))}
    </div>
  </div>
);

SongsHeaderTimes.propTypes = propTypes;

export default SongsHeaderTimes;
