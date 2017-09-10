import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import { login, toggleFollow, toggleLike } from '../actions/SessionActions';
import fetchUserIfNeeded from '../actions/UserActions';
import { getId, getIsAuthenticated, getLikes, getPlayingSongId, getSidebarHeight } from '../selectors/CommonSelectors';
import { getFollowings, getIsFollowing, getPlaylist, getProfiles, getShouldFetchUser, getSongs, getUser } from '../selectors/UserSelectors';

const UserContainer = props => <User {...props} />;

const mapStateToProps = (state) => {
  const { player } = state;

  return {
    followings: getFollowings(state),
    id: getId(state),
    isAuthenticated: getIsAuthenticated(state),
    isFollowing: getIsFollowing(state),
    likes: getLikes(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlist: getPlaylist(state),
    profiles: getProfiles(state),
    sidebarHeight: getSidebarHeight(state),
    shouldFetchUser: getShouldFetchUser(state),
    songs: getSongs(state),
    user: getUser(state),
  };
};

export default connect(mapStateToProps, {
  fetchUserIfNeeded,
  login,
  toggleFollow,
  toggleLike,
  navigateTo,
  playSong,
})(UserContainer);
