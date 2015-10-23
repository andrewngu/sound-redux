import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {changeHeight} from '../actions/height';
import {navigateBack, navigateTo} from '../actions/navigator';
import {changeActivePlaylist, fetchSongsIfNeeded} from '../actions/playlists';

import Header from '../components/Header';
import Player from '../components/Player';
import Song from '../components/Song';
import Songs from '../components/Songs';
import User from '../components/User';

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
    const path = window.location.hash === '' ? ['songs'] : window.location.hash.replace('#/', '').split('/');
    dispatch(navigateTo(path));
}

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        initHeight(dispatch);
        initNavigator(dispatch);
        dispatch(changeActivePlaylist('house'));
    }

    renderContent() {
        const {activePlaylist, dispatch, height, navigator, player, playingSong, playlists, song, songs, user, users} = this.props;
        const {path} = navigator;
        if (path[0] === 'songs' && path.length === 1) {
            return (
                <Songs
                    {...this.props}
                    scrollFunc={fetchSongsIfNeeded.bind(null, activePlaylist)} />
            );
        } else if (path[0] === 'songs' && path.length === 2) {
            return (
                <Song
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSong={playingSong}
                    song={song}
                    songs={song.title && song.title in playlists ? playlists[song.title] : {}} />
            );
        } else if (path[0] === 'users' && path.length === 2) {
            return (
                <User
                    dispatch={dispatch}
                    height={height}
                    player={player}
                    playingSong={playingSong}
                    songs={user.username && user.username in playlists ? playlists[user.username] : {}}
                    user={user} />
            );
        }
    }

    renderPlayer() {
        const {dispatch, player, playingSongId, playlists, songs, users} = this.props;
        if (playingSongId === null) {
            return;
        }

        const song = songs[playingSongId];
        const user = users[song.user_id];
        return (
            <Player
                dispatch={dispatch}
                player={player}
                playlists={playlists}
                song={song}
                user={user} />
        );
    }

    render() {
        const {dispatch} = this.props;

        return (
            <div>
                <Header dispatch={dispatch} />
                {this.renderContent()}
                {this.renderPlayer()}
            </div>
        );
    }
}

App.propTypes = {
    activePlaylist: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playingSong: PropTypes.object,
    playlists: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {activePlaylist, activeSongId, activeUserId, entities, height, navigator, player, playlists, songs, users} = state;
    const song = activeSongId && activeSongId in entities.songs ? entities.songs[activeSongId] : {};
    const user = activeUserId && activeUserId in entities.users ? entities.users[activeUserId] : {};
    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;
    let playingSong = playingSongId in entities.songs ? entities.songs[playingSongId] : {};

    return {
        activePlaylist,
        height,
        navigator,
        player,
        playingSong,
        playingSongId,
        playlists,
        song,
        songs: entities.songs,
        user,
        users: entities.users
    };
}


export default connect(mapStateToProps)(App);
