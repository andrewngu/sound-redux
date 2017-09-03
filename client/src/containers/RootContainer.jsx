import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initAuth } from '../actions/AuthedActions';
import { initEnvironment } from '../actions/EnvironmentActions';
import { initRouter } from '../actions/RouterActions';

import Router from '../components/Router';

import NavContainer from '../containers/NavContainer';
import ModalContainer from '../containers/ModalContainer';
import PlayerContainer from '../containers/PlayerContainer';
import SongContainer from '../containers/SongContainer';
import SongsContainer from '../containers/SongsContainer';
import UserContainer from '../containers/UserContainer';

import {
  INDEX_PATH,
  SONG_PATH,
  SONGS_PATH,
  USER_PATH,
} from '../constants/RouterConstants';

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

class RootContainer extends Component {
  componentDidMount() {
    const { paths } = this.props;

    this.props.initAuth();
    this.props.initEnvironment();
    this.props.initRouter(paths);
  }

  render() {
    const { router, routes } = this.props;

    return (
      <div>
        <NavContainer />
        <Router
          router={router}
          routes={routes}
        />
        <PlayerContainer />
        <ModalContainer />
      </div>
    );
  }
}

RootContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { router } = state;

  return {
    paths: [INDEX_PATH, SONG_PATH, SONGS_PATH, USER_PATH],
    router,
    routes: {
      [INDEX_PATH]: SongsContainer,
      [SONG_PATH]: SongContainer,
      [SONGS_PATH]: SongsContainer,
      [USER_PATH]: UserContainer,
    },
  };
}


export default connect(mapStateToProps, {
  initAuth,
  initEnvironment,
  initRouter,
})(RootContainer);
