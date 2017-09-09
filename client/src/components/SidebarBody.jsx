/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const onScroll = () => { document.body.style.overflow = 'hidden'; };
const onMouseLeave = () => { document.body.style.overflow = 'auto'; };

class SidebarBody extends Component {
  componentWillUnmount() {
    onMouseLeave();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="sidebar__body" onScroll={onScroll}>
        <div onMouseLeave={onMouseLeave}>
          {children}
        </div>
      </div>
    );
  }
}

SidebarBody.propTypes = propTypes;

export default SidebarBody;
