import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  logout: PropTypes.func.isRequired,
};

const SessionPopoverPanel = ({ logout }) => (
  <div
    className="popover__panel__item"
    onClick={logout}
    role="button"
    tabIndex="0"
  >
    Logout
  </div>
);

SessionPopoverPanel.propTypes = propTypes;

export default SessionPopoverPanel;
