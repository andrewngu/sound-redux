import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {initAuth} from '../actions/authed';
import {initEnvironment} from '../actions/environment';
import {initNavigator} from '../actions/navigator';

import MobileFooter from '../components/MobileFooter';

import NavContainer from '../containers/NavContainer';
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
        const {height, isMobile, width} = this.props;
        if (isMobile) {
            return (
                <div className='mobile' style={{height: `${height}px`, width: `${width}px`}}>
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

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const {environment, navigator} = state;

    return {
        height: environment.height,
        isMobile: environment.isMobile,
        path: navigator.route.path,
        width: environment.width
    };
}


export default connect(mapStateToProps)(App);
