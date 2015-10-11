import * as types from '../constants/ActionTypes';
import {navigateTo} from '../actions/navigator';
import {constructSongUrl, constructSongCommentsUrl, constructUserSongsUrl} from '../helpers/SongsHelper';

export function changeActiveSong(songId) {
    return dispatch => {
        dispatch(fetchSongIfNeeded(songId));
        dispatch(navigateTo(['songs', songId]));
        dispatch(changeActiveSongId(songId));
    };
}

function changeActiveSongId(songId) {
    return {
        type: types.CHANGE_ACTIVE_SONG_ID,
        songId: songId
    };
}

function fetchRelatedSongs(userId, songTitle) {
    return dispatch => {
        return fetch(constructUserSongsUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveSongs(json.filter(song => songTitle !== song.title), songTitle)))
            .catch(error => console.log(error));
    };
}

function fetchSongIfNeeded(songId) {
    return (dispatch, getState) => {
        const {songs} = getState();
        if (!(songId in songs)) {
            return dispatch(fetchSong(songId));
        }
    };
}

function fetchSong(songId) {
    return dispatch => {
        dispatch(requestSong(songId));
        return fetch(constructSongUrl(songId))
            .then(response => response.json())
            .then(json => dispatch(receiveSongPre(songId, json)))
            .catch(error => console.log(error));
    };
}

function fetchSongComments(songId) {
    return dispatch => {
        return fetch(constructSongCommentsUrl(songId))
            .then(response => response.json())
            .then(json => dispatch(receiveSongComments(songId, json)))
            .catch(error => console.log(error));
    };
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
        dispatch(fetchRelatedSongs(song.user_id, song.title));
        dispatch(fetchSongComments(songId));
        dispatch(receiveSong(songId, song));
        dispatch(receiveSongs([song], song.title));
    };
}

function receiveSongs(songs, songTitle) {
    return {
      type: types.RECEIVE_SONGS,
      nextUrl: null,
      playlist: songTitle,
      songs: songs
    };
}

function requestSong(songId) {
    return {
        type: types.REQUEST_SONG,
        songId: songId
    };
}
