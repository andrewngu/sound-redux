import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

class Popover extends Component {
  constructor(props) {
    super(props);
    if (props.children.length !== 2) {
      throw new Error('Popover component requires exactly 2 children');
    }

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);

    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick);
  }

  onOutsideClick(e) {
    if (!this.state.isOpen) {
      return;
    }

    e.stopPropagation();
    const localNode = ReactDOM.findDOMNode(this);
    let source = e.target;

    while (source.parentNode) {
      if (source === localNode) {
        return;
      }
      source = source.parentNode;
    }

    this.setState({
      isOpen: false,
    });
  }

  toggleIsOpen() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { className, children } = this.props;

    return (
      <div
        className={`${className} popover ${(isOpen ? ' open' : '')}`}
        onClick={this.toggleIsOpen}
      >
        {children[0]}
        {isOpen ? children[1] : null}
      </div>
    );
  }
}

Popover.propTypes = propTypes;

export default Popover;
