import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import login from '../actions/SessionActions';
import Nav from '../components/Nav';
import { getIsAuthenticated, getSessionUser } from '../selectors/CommonSelectors';

const NavContainer = props => <Nav {...props} />;

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
  user: getSessionUser(state),
});

export default connect(mapStateToProps, {
  login,
  navigateTo,
})(NavContainer);
