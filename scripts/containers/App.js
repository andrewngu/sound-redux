import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {navigateBack, navigateTo} from '../actions/navigator';
import {changeActivePlaylist, fetchSongsIfNeeded} from '../actions/playlists';

import Header from '../components/Header';
import SongPlayer from '../components/SongPlayer';
import Song from '../components/Song';
import Songs from '../components/Songs';

function initNavigator(dispatch) {
    window.onpopstate = e => {
        dispatch(navigateBack(e));
    };
    dispatch(navigateTo(['songs']));
}

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        initNavigator(dispatch);
        dispatch(changeActivePlaylist('house'));
    }

    renderContent() {
        const {activePlaylist, navigator, playlists, song} = this.props;
        const {path} = navigator;
        if (path[0] === 'songs' && path.length === 1) {
            return (
                <Songs
                    {...this.props}
                    scrollFunc={fetchSongsIfNeeded.bind(null, activePlaylist)} />
            );
        } else if (path[0] === 'songs' && path.length === 2) {
            return (
                <Song song={song} songs={song.title && song.title in playlists ? playlists[song.title] : {}} />
            );
        }
    }

    renderSongPlayer() {
        const {dispatch, player, playlists} = this.props;
        const {currentSongIndex, selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        if (currentSongIndex === null) {
            return;
        }

        return (
            <SongPlayer
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
                {this.renderSongPlayer()}
            </div>
        );
    }
}

App.propTypes = {
    activePlaylist: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired,
    song: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const {activePlaylist, activeSongId, navigator, player, playlists, songs} = state;
    const song = activeSongId && activeSongId in songs ? songs[activeSongId] : {};

    return {
        activePlaylist,
        navigator,
        player,
        playlists,
        song
    };
}


export default connect(mapStateToProps)(App);
