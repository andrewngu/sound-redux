/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class SidebarBody extends Component {
  componentWillUnmount() {
    document.body.style = 'auto';
  }

  render() {
    const { children } = this.props;

    return (
      <div
        className="sidebar__body"
        onMouseEnter={() => { document.body.style = 'hidden'; }}
        onMouseLeave={() => { document.body.style = 'auto'; }}
      >
        {children}
      </div>
    );
  }
}

SidebarBody.propTypes = propTypes;

export default SidebarBody;
