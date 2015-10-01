import {fetchSongsIfNeeded} from '../actions/playlists';
import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

export function changeActivePlaylist(playlist) {
    return (dispatch, getState) => {
        const {playlists} = getState();
        dispatch(setActivePlaylist(playlist));
        if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
            dispatch(fetchSongsIfNeeded(playlist));
        }
    }
}

function setActivePlaylist(playlist) {
    return {
        type: types.CHANGE_ACTIVE_PLAYLIST,
        playlist: playlist
    };
}
