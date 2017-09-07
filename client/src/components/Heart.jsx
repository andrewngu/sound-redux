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
    const { id, liked, toggleLike } = this.props;
    toggleLike(id, !liked);
  }

  render() {
    const { className, isAuthenticated, liked, login } = this.props;
    if (!isAuthenticated) {
      return (
        <Popover className={`heart ${className}`} >
          <i className="heart__icon ion-ios-heart" />
          <LoginPopoverPanel login={login} />
        </Popover>
      );
    }

    return (
      <div className={`heart ${liked ? 'heart--liked' : ''} ${className} `}>
        <i
          className="heart__icon ion-ios-heart"
          onClick={this.onClick}
          role="button"
          tabIndex="0"
        />
      </div>
    );
  }
}

Heart.defaultProps = defaultProps;
Heart.propTypes = propTypes;

export default Heart;
