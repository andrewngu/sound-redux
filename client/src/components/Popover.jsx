import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PopoverPanel from '../components/PopoverPanel';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

class Popover extends Component {
  constructor() {
    super();
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
    this.state = { isOpen: false };
  }

  toggleIsOpen() {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  render() {
    const { isOpen } = this.state;
    const { className, children } = this.props;

    return (
      <div className={`popover ${className}`}>
        <span
          className="popover__trigger"
          onClick={this.toggleIsOpen}
          role="button"
          tabIndex="0"
        >
          {children[0]}
        </span>
        {isOpen
          ? (
            <PopoverPanel
              toggleIsOpen={this.toggleIsOpen}
            >
              {children[1]}
            </PopoverPanel>
          ) : null
        }
      </div>
    );
  }
}

Popover.defaultProps = defaultProps;
Popover.propTypes = propTypes;

export default Popover;
