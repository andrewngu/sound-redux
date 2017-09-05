import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import fetchUserIfNeeded from '../actions/UserActions';
import { getId, getPlayingSongId, getSidebarHeight } from '../selectors/CommonSelectors';
import { getPlaylist, getSongs, getUser } from '../selectors/UserSelectors';

const UserContainer = props => <User {...props} />;

const mapStateToProps = (state) => {
  const { authed, player } = state;

  return {
    authed,
    id: getId(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlist: getPlaylist(state),
    sidebarHeight: getSidebarHeight(state),
    songs: getSongs(state),
    user: getUser(state),
  };
};

export default connect(mapStateToProps, {
  fetchUserIfNeeded,
  navigateTo,
  playSong,
})(UserContainer);
