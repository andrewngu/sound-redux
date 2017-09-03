import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compileHash } from '../utils/RouterUtils';

const defaultProps = {
  className: '',
  keys: {},
  options: {},
  title: '',
};

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  navigateTo: PropTypes.func.isRequired,
  keys: PropTypes.shape({}),
  options: PropTypes.shape({}),
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
};

class Link extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { keys, navigateTo, options, path } = this.props;
    navigateTo({ path, keys, options });
  }

  render() {
    const { children, className, keys, options, path, title } = this.props;

    return (
      <a
        className={className}
        href={`/${compileHash({ path, keys, options })}`}
        onClick={this.onClick}
        title={title}
      >
        {children}
      </a>
    );
  }
}

Link.defaultProps = defaultProps;
Link.propTypes = propTypes;

export default Link;
