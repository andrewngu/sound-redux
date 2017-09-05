import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MobilePlayer from '../components/MobilePlayer';
import Player from '../components/Player';
import { getPlayingSongId } from '../utils/PlayerUtils';

const propTypes = {
  isMobile: PropTypes.bool,
  playingSongId: PropTypes.number,
};

class PlayerContainer extends Component {
  render() {
    const { isMobile, playingSongId } = this.props;
    if (isMobile) {
      return <MobilePlayer {...this.props} />;
    }

    if (playingSongId === null) {
      return <div />;
    }

    return <Player {...this.props} />;
  }
}

PlayerContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { entities, environment, player, playlists, navigator } = state;
  const { isMobile } = environment;
  const { songs, users } = entities;
  const { query } = navigator.route;
  const playingSongId = getPlayingSongId(player, playlists);

  const time = query && query.t ? query.t : null;
  let playlist = query && query.q ? query.q : 'house';
  if (time) {
    playlist = `${playlist} - ${time}`;
  }
  return {
    isMobile,
    player,
    playingSongId,
    playlists,
    songs,
    playlist,
    users,
  };
}

export default connect(mapStateToProps)(PlayerContainer);
