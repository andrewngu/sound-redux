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
        const {activePlaylist, dispatch, height, navigator, player, playingSong, playlists, song, user} = this.props;
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
                    player={player}
                    playingSong={playingSong}
                    user={user} />
            );
        }
    }

    renderPlayer() {
        const {dispatch, player, playlists} = this.props;
        const {currentSongIndex, selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        if (currentSongIndex === null) {
            return;
        }

        return (
            <Player
                dispatch={dispatch}
                player={player}
                playlists={playlists}
                song={playlists[currentPlaylist].items[currentSongIndex]} />
        );
    }

    render() {
        return (
            <div>
                <Header />
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
    const {activePlaylist, activeSongId, activeUserId, height, navigator, player, playlists, songs, users} = state;
    const song = activeSongId && activeSongId in songs ? songs[activeSongId] : {};
    const user = activeUserId && activeUserId in users ? users[activeUserId] : {};
    const playingSong = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : {};

    return {
        activePlaylist,
        height,
        navigator,
        player,
        playingSong,
        playlists,
        song,
        user
    };
}


export default connect(mapStateToProps)(App);
