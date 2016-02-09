import React, {Component, PropTypes} from 'react';
import {fetchSongsIfNeeded} from '../actions/playlists';
import InfiniteScrollify from '../components/InfiniteScrollify';
import {playSong} from '../actions/player';
import MobileSongListItem from '../components/MobileSongListItem';
import MobileSongs from '../components/MobileSongs';
import MobileInfiniteScroll from '../components/MobileInfiniteScroll';
import {AUTHED_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';
import Spinner from '../components/Spinner';

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


    playSong(playlist, i, e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(playSong(playlist, i));
    }

    renderSongsListItems() {
        const {playingSongId, playlists, songs, users} = this.props;
        const playlist = this.getPlaylist() + AUTHED_PLAYLIST_SUFFIX;

        if (!(playlist in playlists)) {
            return;
        }

        return playlists[playlist].items.map((songId, i) => {
            const song = songs[songId];
            const user = users[song.user_id];
            return (
                <MobileSongListItem
                    key={songId + '-' + i}
                    isActive={song.id === playingSongId}
                    playSong={this.playSong.bind(this, playlist, i)}
                    song={song}
                    user={user} />
            );
        });
    }

    renderSpinner() {
        const {playlist, playlists} = this.props;
        if (!(playlist in playlists) || playlists[playlist].isFetching) {
            return <Spinner />;
        }

        return;
    }

    render() {
        const {dispatch, users, playlists, songs, playlist} = this.props;
        return (
            
            <MobileInfiniteScroll
                className={'mobile-songs'}
                dispatch={dispatch}
                scrollFunc={fetchSongsIfNeeded.bind(null, playlist)}>
                {this.renderSongsListItems()}
                {this.renderSpinner()}
            </MobileInfiniteScroll>
        );
    }
}

export default MobileMe;
