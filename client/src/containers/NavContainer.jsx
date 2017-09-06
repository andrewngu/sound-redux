import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import login from '../actions/SessionActions';
import Nav from '../components/Nav';

const NavContainer = props => <Nav {...props} />;

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  login,
  navigateTo,
})(NavContainer);
