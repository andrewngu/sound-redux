import * as types from '../constants/ActionTypes';

export function changeActiveSongIndex(activeSongIndex) {
    return {
        type: types.CHANGE_ACTIVE_SONG_INDEX,
        activeSongIndex: activeSongIndex,
    };
}

function fetchSongs(url) {
    return dispatch => {
        dispatch(requestSongs());
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveSongs(json)));
    };
}

export function fetchSongsIfNeeded() {
    return (dispatch, getState) => {
        const {songs} = getState();
        if (shouldFetchSongs(songs)) {
            return dispatch(fetchSongs(songs.nextUrl))
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
