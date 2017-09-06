import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import { login, logout } from '../actions/SessionActions';
import Nav from '../components/Nav';
import { getIsAuthenticated, getSessionUser, getShowLikes, getShowStream } from '../selectors/CommonSelectors';

const NavContainer = props => <Nav {...props} />;

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  showLikes: getShowLikes(state),
  showStream: getShowStream(state),
  user: getSessionUser(state),
});

export default connect(mapStateToProps, {
  login,
  logout,
  navigateTo,
})(NavContainer);
