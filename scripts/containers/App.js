import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongsIfNeeded} from '../actions/songs';

import Header from '../components/Header';
import SongPlayer from '../components/SongPlayer';
import Songs from '../components/Songs';

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(fetchSongsIfNeeded());
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
        return (
            <div>
                <Header />
                <Songs {...this.props} scrollFunc={fetchSongsIfNeeded} />
                {this.renderSongPlayer()}
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    songs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { player, songs } = state;

    return {
        player,
        songs
    };
}


export default connect(mapStateToProps)(App);
