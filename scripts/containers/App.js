import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {initAuth} from '../actions/authed';
import {initEnvironment} from '../actions/environment';
import {initHeight} from '../actions/height';
import {initNavigator} from '../actions/navigator';

import MobileFooter from '../components/MobileFooter';

import NavContainer from '../containers/NavContainer';
import MeContainer from '../containers/MeContainer';
import ModalContainer from '../containers/ModalContainer';
import PlayerContainer from '../containers/PlayerContainer';
import SongContainer from '../containers/SongContainer';
import SongsContainer from '../containers/SongsContainer';
import UserContainer from '../containers/UserContainer';

import styles from '../../styles/mobile/container';

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
        const {isMobile} = this.props;
        if (isMobile) {
            return (
                <div style={styles.container}>
                    <ModalContainer />
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

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const {environment, navigator} = state;

    return {
        isMobile: environment.isMobile,
        path: navigator.route.path
    };
}


export default connect(mapStateToProps)(App);
