import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongsIfNeeded} from '../actions/playlists';
import {changeActivePlaylist} from '../actions/songs';

import Header from '../components/Header';
import SongPlayer from '../components/SongPlayer';
import Songs from '../components/Songs';

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(changeActivePlaylist('house'));
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
        const {activePlaylist} = this.props;

        return (
            <div>
                <Header />
                <Songs {...this.props} scrollFunc={fetchSongsIfNeeded.bind(null, activePlaylist)} />
                {this.renderSongPlayer()}
            </div>
        );
    }
}

App.propTypes = {
    activePlaylist: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    playlists: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {activePlaylist, activeSongId, navigator, player, playlists, songs} = state;
    const song = activeSongId ? songs[activeSongId] : {};

    return {
        activePlaylist,
        navigator,
        player,
        playlists,
        song
    };
}


export default connect(mapStateToProps)(App);
