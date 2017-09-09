import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import { login, logout } from '../actions/SessionActions';
import Nav from '../components/Nav';
import { getIsAuthenticated, getSessionUser, getShowLikes, getShowPlaylist, getShowStream } from '../selectors/CommonSelectors';
import { getPlaylist, getPlaylists } from '../selectors/NavSelectors';

const NavContainer = props => <Nav {...props} />;

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  playlist: getPlaylist(state),
  playlists: getPlaylists(state),
  showLikes: getShowLikes(state),
  showPlaylist: getShowPlaylist(state),
  showStream: getShowStream(state),
  user: getSessionUser(state),
});

export default connect(mapStateToProps, {
  login,
  logout,
  navigateTo,
})(NavContainer);
