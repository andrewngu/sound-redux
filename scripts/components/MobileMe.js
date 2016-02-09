import React, {Component, PropTypes} from 'react';
import {AUTHED_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';
import MobileSongList from '../components/MobileSongList';

class MobileMe extends Component {
    getPlaylist() {
        const {authedPlaylists, route} = this.props;
        const {path} = route;

        if (path[1].indexOf('PLAYLIST:') >= 0) {
            return path[1].slice(10);
        }

        switch(path[1]) {
        case 'stream':
            return 'stream';
        case 'likes':
            return 'likes';
        default:
            return 'stream';
        }
    }


    render() {
        const {dispatch, playlists, songs, users, playingSongId} = this.props;
        const playlist = this.getPlaylist() + AUTHED_PLAYLIST_SUFFIX;
        return (
            <MobileSongList
            playlist={playlist}
            playlists={playlists}
            songs={songs}
            users={users}
            playingSongId={playingSongId}
            dispatch={dispatch}>
            </MobileSongList>
        );
    }
}

export default MobileMe;
