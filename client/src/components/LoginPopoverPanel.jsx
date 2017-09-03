import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  login: PropTypes.func.isRequired,
};

const LoginPopoverPanel = ({ login }) => (
  <span
    className="button button--orange button--block button--margin"
    onClick={login}
    role="button"
    tabIndex="0"
  >
    Sign into SoundCloud
  </span>
);

LoginPopoverPanel.propTypes = propTypes;

export default LoginPopoverPanel;
