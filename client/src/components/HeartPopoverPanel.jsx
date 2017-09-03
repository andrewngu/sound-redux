import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  login: PropTypes.func.isRequired,
};

const HeartPopoverPanel = ({ login }) => (
  <span
    className="button button--orange button--block button--margin"
    onClick={login}
    role="button"
    tabIndex="0"
  >
    Sign into SoundCloud
  </span>
);

HeartPopoverPanel.propTypes = propTypes;

export default HeartPopoverPanel;
