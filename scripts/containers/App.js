import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initAuth } from '../actions/AuthedActions';
import { initEnvironment } from '../actions/EnvironmentActions';
import { initNavigator } from '../actions/NavigatorActions';

import NavContainer from '../containers/NavContainer';
import MeContainer from '../containers/MeContainer';
import ModalContainer from '../containers/ModalContainer';
import PlayerContainer from '../containers/PlayerContainer';
import SongContainer from '../containers/SongContainer';
import SongsContainer from '../containers/SongsContainer';
import UserContainer from '../containers/UserContainer';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  path: PropTypes.array.isRequired,
  width: PropTypes.number,
};

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initEnvironment());
    dispatch(initAuth());
    dispatch(initNavigator());
  }

  renderContent() {
    const { path } = this.props;
    switch (path[0]) {
      case 'songs':
        switch (path.length) {
          case 1:
            return <SongsContainer />;
          case 2:
            return <SongContainer />;
          default:
            return null;
        }
      case 'users':
        return <UserContainer />;
      case 'me':
        return <MeContainer />;
      default:
        return null;
    }
  }

  render() {
    const { height, isMobile, width } = this.props;
    if (isMobile) {
      return (
        <div className="mobile" style={{ height: `${height}px`, width: `${width}px` }}>
          <PlayerContainer />
          {this.renderContent()}
          <NavContainer />
        </div>
      );
    }

    return (
      <div>
        <NavContainer />
        {this.renderContent()}
        <PlayerContainer />
        <ModalContainer />
      </div>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const { environment, navigator } = state;
  const { height, isMobile, width } = environment;
  const { path } = navigator.route;

  return {
    height,
    isMobile,
    path,
    width,
  };
}


export default connect(mapStateToProps)(App);
