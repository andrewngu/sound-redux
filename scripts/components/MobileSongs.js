import React, {Component, PropTypes} from 'react';
import {fetchSongsIfNeeded} from '../actions/playlists';
import MobileSongListItem from '../components/MobileSongListItem';

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

    renderSongsListItems() {
        const {playlist, playlists, songs, users} = this.props;
        return playlists[playlist].items.map(songId => {
            const song = songs[songId];
            const user = users[song.user_id];
            return <MobileSongListItem song={song} user={user} />
        });
    }

    render() {
        return (
            <div className='mobile-songs'>
                {this.renderSongsListItems()}
            </div>
        );
    }
}

export default MobileSongs;
