import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  genre: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongsHeaderTimes = ({ genre, navigateTo, time, times }) => (
  <div className="songs-header__section">
    <i className="songs-header__icon ion-funnel" />
    {times.map(t => (
      <Link
        className={`songs-header__time ${t.key === time ? 'songs-header__time--active' : ''}`}
        key={t.key}
        navigateTo={navigateTo}
        options={{
          t: t.key,
          ...genre ? { g: genre } : {},
        }}
        path={SONGS_PATH}
      >
        {t.label}
      </Link>
    ))}
  </div>
);

SongsHeaderTimes.propTypes = propTypes;

export default SongsHeaderTimes;
