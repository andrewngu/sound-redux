import React, {Component, PropTypes} from 'react';
import {fetchSongsIfNeeded} from '../actions/playlists';
import {playSong} from '../actions/player';
import MobileSongListItem from '../components/MobileSongListItem';
import MobileInfiniteScroll from '../components/MobileInfiniteScroll';
import Spinner from '../components/Spinner';

class MobileSongs extends Component {
    componentWillMount() {
        const {dispatch, playlist, playlists} = this.props;
        if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
            dispatch(fetchSongsIfNeeded(playlist));
        }
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, playlist, playlists} = this.props;
        if (playlist !== nextProps.playlist) {
            if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
                dispatch(fetchSongsIfNeeded(nextProps.playlist));
            }
        }
    }

    playSong(playlist, i, e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(playSong(playlist, i));
    }

    renderSongsListItems() {
        const {playingSongId, playlist, playlists, songs, users} = this.props;
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
        const {dispatch, playlist} = this.props;

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

export default MobileSongs;
