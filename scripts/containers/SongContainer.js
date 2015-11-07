import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Song from '../components/Song';
import {getPlayingSongId} from '../utils/PlayerUtils';

class SongContainer extends Component {
    render() {
        return <Song {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, height, navigator, player, playlists} = state;
    const {path, query} = navigator.route;
    const songId = parseInt(path[1]);

    const playingSongId = getPlayingSongId(player, playlists);

    return {
        authed,
        height,
        player,
        playingSongId,
        playlists,
        songId,
        songs: entities.songs,
        users: entities.users
    }
}

export default connect(mapStateToProps)(SongContainer);
