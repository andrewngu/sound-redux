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
    this.onClick = this.onClick.bind(this);
    this.node = null;
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  onClick(e) {
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
