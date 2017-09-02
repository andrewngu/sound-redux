import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  time: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongsHeaderTimes = ({ time, times }) => (
  <div className="songs-header__section">
    <i className="songs-header__icon ion-funnel" />
    {times.map(t => (
      <div className={`songs-header__time ${t.key === time ? 'songs-header__time--active' : ''}`}>
        {t.label}
      </div>
    ))}
  </div>
);

SongsHeaderTimes.propTypes = propTypes;

export default SongsHeaderTimes;
