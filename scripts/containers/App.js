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
        const {activeSongIndex, selectedPlaylists} = player;
        const activePlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        if (!activePlaylist || activeSongIndex === null) {
            return;
        }

        return (
            <SongPlayer
                dispatch={dispatch}
                player={player}
                playlists={playlists}
                song={playlists[activePlaylist].items[activeSongIndex]} />
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
    dispatch: PropTypes.func.isRequired,
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const {activePlaylist, player, playlists} = state;

    return {
        activePlaylist,
        player,
        playlists
    };
}


export default connect(mapStateToProps)(App);
