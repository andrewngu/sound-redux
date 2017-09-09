/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
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
    const { target } = e;
    const { tagName } = target;
    const role = target.getAttribute('role');

    const outsideClick = !this.node.contains(target);
    const targetIsButton = role === 'button';
    const targetIsLink = role === 'link' || tagName === 'A';

    if (outsideClick || targetIsButton || targetIsLink) {
      const { toggleIsOpen } = this.props;
      toggleIsOpen();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="popover__panel" ref={(node) => { this.node = node; }}>
        {children}
      </div>
    );
  }
}

PopoverPanel.propTypes = propTypes;

export default PopoverPanel;
