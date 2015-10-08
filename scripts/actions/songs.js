import * as types from '../constants/ActionTypes';
import {navigateTo} from '../actions/navigator';
import {constructSongUrl, constructSongCommentsUrl} from '../helpers/SongsHelper';

export function changeActiveSong(songId) {
    return dispatch => {
        dispatch(fetchSongIfNeeded(songId));
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

function fetchSongIfNeeded(songId) {
    return (dispatch, getState) => {
        const {songs} = getState();
        if (!(songId in songs)) {
            return dispatch(fetchSong(songId));
        }
    }
}

function fetchSong(songId) {
    return dispatch => {
        dispatch(requestSong(songId));
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

function receiveSongComments(songId, comments) {
    return {
        type: types.RECEIVE_SONG_COMMENTS,
        comments: comments,
        songId: songId
    };
}

function receiveSongPre(songId, song) {
    return dispatch => {
        dispatch(receiveSong(songId, song));
        dispatch(fetchSongComments(songId));
    };
}

function requestSong(songId) {
    return {
        type: types.REQUEST_SONG,
        songId: songId
    };
}
