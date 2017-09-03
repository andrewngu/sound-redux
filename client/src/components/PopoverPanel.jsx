/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  renderPanel: PropTypes.func.isRequired,
  toggleIsOpen: PropTypes.func.isRequired,
};

class PopoverPanel extends Component {
  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.node = null;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(e) {
    if (!this.node.contains(e.target)) {
      const { toggleIsOpen } = this.props;
      toggleIsOpen();
    }
  }

  render() {
    const { renderPanel } = this.props;
    return (
      <div className="popover__panel" ref={(node) => { this.node = node; }}>
        {renderPanel()}
      </div>
    );
  }
}

PopoverPanel.propTypes = propTypes;

export default PopoverPanel;
