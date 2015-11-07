import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongsIfNeeded} from '../actions/playlists';
import Songs from '../components/Songs';

class SongsContainer extends Component {
    render() {
        return <Songs {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, height, navigator, player, playlists} = state;

    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;

    const {path, query} = navigator.route;
    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'house';
    if (time) {
        playlist = `${playlist} - ${time}`;
    }

    return {
        authed,
        height,
        playingSongId,
        playlist,
        playlists,
        scrollFunc: fetchSongsIfNeeded.bind(null, playlist),
        songs: entities.songs,
        time,
        users: entities.users
    };
}

export default connect(mapStateToProps)(SongsContainer);
