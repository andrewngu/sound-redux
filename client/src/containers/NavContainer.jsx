import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import { fetchNewStreamSongs, login, logout } from '../actions/SessionActions';
import Nav from '../components/Nav';
import { getIsAuthenticated, getSessionUser, getShowLikes, getShowPlaylist, getShowStream } from '../selectors/CommonSelectors';
import { getNavPlaylist, getNavPlaylists, getNewStreamSongsCount, getStreamFutureUrl } from '../selectors/NavSelectors';

const NavContainer = props => <Nav {...props} />;

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  navPlaylist: getNavPlaylist(state),
  navPlaylists: getNavPlaylists(state),
  newStreamSongsCount: getNewStreamSongsCount(state),
  showLikes: getShowLikes(state),
  showPlaylist: getShowPlaylist(state),
  showStream: getShowStream(state),
  streamFutureUrl: getStreamFutureUrl(state),
  user: getSessionUser(state),
});

export default connect(mapStateToProps, {
  fetchNewStreamSongs,
  login,
  logout,
  navigateTo,
})(NavContainer);
