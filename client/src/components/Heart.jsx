import PropTypes from 'prop-types';
import React from 'react';
import LoginPopoverPanel from '../components/LoginPopoverPanel';
import Popover from '../components/Popover';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

const Heart = ({ isAuthenticated, className, id, liked, login, toggleLike }) => {
  if (!isAuthenticated) {
    return (
      <Popover
        className={className}
        renderPanel={() => <LoginPopoverPanel login={login} />}
      >
        <i className="heart ion-ios-heart" />
      </Popover>
    );
  }

  return (
    <i
      className={`heart ${liked ? 'heart--liked' : ''} ${className}`}
      onClick={() => toggleLike(id)}
      role="button"
      tabIndex="0"
    />
  );
};

Heart.defaultProps = defaultProps;
Heart.propTypes = propTypes;

export default Heart;
