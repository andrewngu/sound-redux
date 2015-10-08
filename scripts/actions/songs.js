import * as types from '../constants/ActionTypes';
import {navigateTo} from '../actions/navigator';
import {constructSongUrl} from '../helpers/SongsHelper';

export function changeActiveSong(songId) {
    return (dispatch, getState) => {
        const {songs} = getState();
        if (!(songId in songs)) {
            dispatch(fetchSong(songId));
        }

        dispatch(navigateTo(['songs', songId]));
        dispatch(changeActiveSongId(songId));
     }
}

function changeActiveSongId(songId) {
    return {
        type: types.CHANGE_ACTIVE_SONG_ID,
        songId: songId
    };
}

function fetchSong(songId) {
    return dispatch => {
        return fetch(constructSongUrl(songId))
            .then(response => response.json())
            .then(json => dispatch(receiveSong(songId, json)))
            .catch(error => console.log(error));
    }
}

function receiveSong(songId, song) {
    return {
        type: types.RECEIVE_SONG,
        song: song,
        songId: songId
    };
}
