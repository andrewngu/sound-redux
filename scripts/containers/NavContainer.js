import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MobileNav from '../components/MobileNav';
import Nav from '../components/Nav';

const propTypes = {
  isMobile: PropTypes.bool,
};

class NavContainer extends Component {
  render() {
    const { isMobile } = this.props;
    if (isMobile) {
      return <MobileNav {...this.props} />;
    }

    return <Nav {...this.props} />;
  }
}

function mapStateToProps(state) {
  const { authed, entities, environment, navigator } = state;
  const { playlists, songs } = entities;
  const { isMobile } = environment;

  return {
    authed,
    authedPlaylists: playlists,
    isMobile,
    navigator,
    songs,
  };
}

NavContainer.propTypes = propTypes;

export default connect(mapStateToProps)(NavContainer);
