import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Router from '../components/Router';
import HistoryContainer from '../containers/HistoryContainer';
import NavContainer from '../containers/NavContainer';
import PlayerContainer from '../containers/PlayerContainer';

const propTypes = {
  initAuth: PropTypes.func.isRequired,
  initEnvironment: PropTypes.func.isRequired,
  initRouter: PropTypes.func.isRequired,
  paths: PropTypes.arrayOf(PropTypes.string).isRequired,
  router: PropTypes.shape({
    keys: PropTypes.shape({}),
    options: PropTypes.shape({}),
    path: PropTypes.string,
  }).isRequired,
  routes: PropTypes.shape({}).isRequired,
};

class Root extends Component {
  componentWillMount() {
    const { initAuth, initEnvironment, initRouter, paths } = this.props;
    initAuth();
    initEnvironment();
    initRouter(paths);
  }

  render() {
    const { router, routes } = this.props;
    return (
      <div>
        <NavContainer />
        <Router router={router} routes={routes} />
        <PlayerContainer />
        <HistoryContainer />
      </div>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
