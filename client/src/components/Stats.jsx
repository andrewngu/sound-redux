import PropTypes from 'prop-types';
import React from 'react';
import Heart from '../components/Heart';
import { addCommas } from '../utils/NumberUtils';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  commentCount: PropTypes.number.isRequired,
  favoritingsCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  playbackCount: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

const Stats = ({
  className,
  commentCount,
  id,
  isAuthenticated,
  favoritingsCount,
  liked,
  login,
  playbackCount,
  toggleLike,
}) => (
  <div className={`stats ${className}`}>
    <Heart
      className="stats__stat stats__stat--heart"
      favoritingsCount={favoritingsCount}
      id={id}
      isAuthenticated={isAuthenticated}
      liked={liked}
      login={login}
      toggleLike={toggleLike}
    />
    <div className="stats__stat">
      <i className="stats__stat__icon ion-play" />
      <span className="stats__stat__text">
        {addCommas(playbackCount)}
      </span>
    </div>
    <div className="stats__stat">
      <i className="stats__stat__icon ion-chatbubble" />
      <span className="stats__stat__text">
        {addCommas(commentCount)}
      </span>
    </div>
  </div>
);

Stats.defaultProps = defaultProps;
Stats.propTypes = propTypes;

export default Stats;
