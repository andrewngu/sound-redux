import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {initAuth} from '../actions/authed';
import {initEnvironment} from '../actions/environment';
import {initHeight} from '../actions/height';
import {initNavigator} from '../actions/navigator';

import HeaderContainer from '../containers/HeaderContainer';
import MeContainer from '../containers/MeContainer';
import ModalContainer from '../containers/ModalContainer';
import PlayerContainer from '../containers/PlayerContainer';
import SongContainer from '../containers/SongContainer';
import SongsContainer from '../containers/SongsContainer';
import UserContainer from '../containers/UserContainer';

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(initEnvironment());
        dispatch(initAuth());
        dispatch(initHeight());
        dispatch(initNavigator());
    }

    renderContent() {
        const {path} = this.props;
        switch(path[0]) {
        case 'songs':
            switch(path.length) {
            case 1:
                return <SongsContainer />;
            case 2:
                return <SongContainer />;
            }
        case 'users':
            return <UserContainer />;
        case 'me':
            return <MeContainer />;
        default:
            return;
        }
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                {this.renderContent()}
                <PlayerContainer />
                <ModalContainer />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {navigator} = state;

    return {
        path: navigator.route.path
    };
}


export default connect(mapStateToProps)(App);
