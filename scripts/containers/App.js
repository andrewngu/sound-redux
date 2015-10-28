import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {changeHeight} from '../actions/height';
import {navigateBack, navigateTo} from '../actions/navigator';
import {fetchSongsIfNeeded} from '../actions/playlists';

import Header from '../components/Header';
import Me from '../components/Me';
import Modal from '../components/Modal';
import Player from '../components/Player';
import Song from '../components/Song';
import Songs from '../components/Songs';
import User from '../components/User';

import {parseUrl} from '../utils/RouteUtils';

function initHeight(dispatch) {
    dispatch(changeHeight(window.innerHeight));
    window.onresize = () => {
        dispatch(changeHeight(window.innerHeight));
    }
}

function initNavigator(dispatch) {
    window.onpopstate = e => {
        dispatch(navigateBack(e));
    };
    if (window.location.hash !== '') {
        dispatch(navigateTo(parseUrl(window.location.hash)));
    }
}

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        initHeight(dispatch);
        initNavigator(dispatch);
    }

    renderContent() {
        const {auth, dispatch, height, navigator, player, playingSongId, playlists, songs, users} = this.props;
        const {path, query} = navigator.route;
        if (path[0] === 'songs' && path.length === 1) {
            const time = query && query.t ? query.t : null;
            let playlist = query && query.q ? query.q : 'house';
            if (time) {
                playlist = `${playlist} - ${time}`;
            }

            return (
                <Songs
                    {...this.props}
                    playlist={playlist}
                    time={time} />
            );
        } else if (path[0] === 'songs' && path.length === 2) {
            return (
                <Song
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSongId={playingSongId}
                    playlists={playlists}
                    songId={parseInt(path[1])}
                    songs={songs}
                    users={users} />
            );
        } else if (path[0] === 'users' && path.length === 2) {
            return (
                <User
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSongId={playingSongId}
                    playlists={playlists}
                    songs={songs}
                    userId={parseInt(path[1])}
                    users={users} />
            );
        } else if (path[0] === 'me') {
            return (
                <Me
                    auth={auth}
                    dispatch={dispatch}
                    player={player}
                    playingSongId={playingSongId}
                    playlists={playlists}
                    route={navigator.route}
                    songs={songs}
                    users={users} />
            );
        }
    }

    renderModal() {
        const {dispatch, modal} = this.props;
        if (!modal) {
            return;
        }

        return <Modal dispatch={dispatch} modal={modal} />;
    }

    renderPlayer() {
        const {dispatch, player, playingSongId, playlists, songs, users} = this.props;
        if (playingSongId === null) {
            return;
        }

        return (
            <Player
                dispatch={dispatch}
                player={player}
                playingSongId={playingSongId}
                playlists={playlists}
                songs={songs}
                users={users} />
        );
    }

    render() {
        const {dispatch, navigator, playingSongId} = this.props;

        return (
            <div>
                <Header dispatch={dispatch} navigator={navigator} />
                {this.renderContent()}
                {this.renderPlayer()}
                {this.renderModal()}
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playingSongId: PropTypes.number,
    playlists: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {auth, entities, height, modal, navigator, player, playlists} = state;
    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;

    return {
        auth,
        height,
        modal,
        navigator,
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        users: entities.users
    };
}


export default connect(mapStateToProps)(App);
