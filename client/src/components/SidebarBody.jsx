/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const onMouseEnter = () => { document.body.style.overflow = 'hidden'; };
const onMouseLeave = () => { document.body.style.overflow = 'auto'; };

class SidebarBody extends Component {
  componentWillUnmount() {
    onMouseLeave();
  }

  render() {
    const { children } = this.props;

    return (
      <div
        className="sidebar__body"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    );
  }
}

SidebarBody.propTypes = propTypes;

export default SidebarBody;
