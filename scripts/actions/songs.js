import * as types from '../constants/ActionTypes';
import {navigateTo} from '../actions/navigator';
import {constructSongUrl, constructSongCommentsUrl} from '../helpers/SongsHelper';

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
            .then(json => dispatch(receiveSongPre(songId, json)))
            .catch(error => console.log(error));
    }
}

function fetchSongComments(songId) {
    return dispatch => {
        return fetch(constructSongCommentsUrl(songId))
            .then(response => response.json())
            .then(json => dispatch(receiveSongComments(songId, json)))
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

function receiveSongComments(comments) {
    return {
        type: types.RECEIVE_SONG_COMMENTS,
        comments: comments
    };
}

function receiveSongPre(songId, song) {
    return dispatch => {
        dispatch(receiveSong(songId, song));
        dispatch(fetchSongComments(songId));
    };
}
