import PropTypes from 'prop-types';
import React, { Component } from 'react';

const defaultProps = {
  args: [],
};

const propTypes = {
  args: PropTypes.arrayOf(PropTypes.any),
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

class Switch extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { args, onClick } = this.props;
    onClick(...args);
  }

  render() {
    const { on } = this.props;
    return (
      <div
        className={`switch ${on ? 'switch--on' : ''}`}
        onClick={this.onClick}
        role="button"
        tabIndex="0"
      >
        <div className="switch__button" />
      </div>
    );
  }
}

Switch.defaultProps = defaultProps;
Switch.propTypes = propTypes;

export default Switch;
