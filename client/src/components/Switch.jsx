import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Switch = ({ on, onClick }) => (
  <div
    className={`switch ${on ? 'switch--on' : ''}`}
    onClick={onClick}
    role="button"
    tabIndex="0"
  >
    <div className="switch__button" />
  </div>
);

Switch.propTypes = propTypes;

export default Switch;
