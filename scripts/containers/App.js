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
        dispatch(fetchSongsIfNeeded('house'));
    }

    renderSongPlayer() {
        const {dispatch, player} = this.props;
        const {activePlaylist, activeSongIndex, playlists} = player;
        if (activeSongIndex === null
        || activePlaylist == null) {
            return;
        }

        return <SongPlayer dispatch={dispatch} song={playlists[activePlaylist].songs[activeSongIndex]} />
    }

    render() {
        const {activePlaylist} = this.props.songs;

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
    const { player, playlists, songs } = state;

    return {
        player,
        playlists,
        songs
    };
}


export default connect(mapStateToProps)(App);
