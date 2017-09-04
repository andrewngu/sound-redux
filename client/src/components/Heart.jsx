import PropTypes from 'prop-types';
import React, { Component } from 'react';
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

class Heart extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { id, toggleLike } = this.props;
    toggleLike(id);
  }

  render() {
    const { isAuthenticated, className, liked, login, toggleLike } = this.props;
    if (!isAuthenticated) {
      return (
        <Popover
          className={className}
        >
          <i className="heart ion-ios-heart" />
          <LoginPopoverPanel login={login} />
        </Popover>
      );
    }

    return (
      <i
        className={`heart ${liked ? 'heart--liked' : ''} ${className}`}
        onClick={toggleLike}
        role="button"
        tabIndex="0"
      />
    );
  }
}

Heart.defaultProps = defaultProps;
Heart.propTypes = propTypes;

export default Heart;
