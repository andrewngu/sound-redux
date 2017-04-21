import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Me from '../components/Me';
import MobileMe from '../components/MobileMe';
import { getPlayingSongId } from '../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
};

class MeContainer extends Component {
  render() {
    const { isMobile } = this.props;
    if (isMobile) {
      return <MobileMe {...this.props} />;
    }

    return <Me {...this.props} />;
  }
}

MeContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { authed, entities, environment, navigator, player, playlists } = state;
  const { height, isMobile } = environment;
  const { songs, users } = entities;
  const { route } = navigator;
  const playingSongId = getPlayingSongId(player, playlists);

  return {
    authed,
    authedPlaylists: entities.playlists,
    height,
    isMobile,
    player,
    playingSongId,
    playlists,
    route,
    songs,
    users,
  };
}

export default connect(mapStateToProps)(MeContainer);
