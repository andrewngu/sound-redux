import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongsIfNeeded} from '../actions/playlists';
import MobileSongs from '../components/MobileSongs';
import Songs from '../components/Songs';

class SongsContainer extends Component {
    render() {
        const {isMobile} = this.props;
        if (isMobile) {
            return <MobileSongs {...this.props} />;
        }

        return <Songs {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, environment, navigator, player, playlists} = state;

    const playingSongId = player.currentSongIndex !== null ? playlists[player.selectedPlaylists[player.selectedPlaylists.length - 1]].items[player.currentSongIndex] : null;

    const {path, query} = navigator.route;
    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'house';
    if (time) {
        playlist = `${playlist} - ${time}`;
    }

    return {
        authed,
        height: environment.height,
        isMobile: environment.isMobile,
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
