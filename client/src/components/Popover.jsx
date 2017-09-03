import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PopoverPanel from '../components/PopoverPanel';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  renderPanel: PropTypes.func.isRequired,
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
    const { className, children, renderPanel } = this.props;

    return (
      <div className={`popover ${className}`}>
        <span
          className="popover__trigger"
          onClick={this.toggleIsOpen}
          role="button"
          tabIndex="0"
        >
          {children}
        </span>
        {isOpen
          ? <PopoverPanel renderPanel={renderPanel} toggleIsOpen={this.toggleIsOpen} />
          : null
        }
      </div>
    );
  }
}

Popover.defaultProps = defaultProps;
Popover.propTypes = propTypes;

export default Popover;
