import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';

export function changeActiveSong(song) {
    return {
        type: types.CHANGE_ACTIVE_SONG,
        song: song,
    };
}

function fetchSongs() {
    return dispatch => {
        dispatch(requestSongs);
        return fetch(`http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&tags=house&limit=50&offset=0`)
            .then(response => response.json())
            .then(json => dispatch(receiveSongs(json)));
    };
}

export function fetchSongsIfNeeded() {
    return (dispatch, getState) => {
        const {songs} = getState();
        if (shouldFetchSongs(songs)) {
            return dispatch(fetchSongs())
        }
    }
}

function receiveSongs(json) {
    return {
      type: types.RECEIVE_SONGS,
      nextUrl: json.next_href,
      songs: json.collection.filter((song) => song.streamable ),
    };
}

function requestSongs() {
    return {
        type: types.REQUEST_SONGS,
    };
}

function shouldFetchSongs(songs) {
    if (songs.isFetching || !songs.nextUrl) {
        return false;
    }

    return true;
}
