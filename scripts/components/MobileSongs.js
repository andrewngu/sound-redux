import React, {Component, PropTypes} from 'react';
import {fetchSongsIfNeeded} from '../actions/playlists';
import MobileSongList from '../components/MobileSongList';


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

    render() {
        const {dispatch, playlist, playlists, songs, users, playingSongId} = this.props;
        
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


export default MobileSongs;
