import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

export function changeActiveSongIndex(activeSongIndex) {
    return {
        type: types.CHANGE_ACTIVE_SONG_INDEX,
        activeSongIndex: activeSongIndex,
    };
}

export function changeCategory(category) {
    return (dispatch) => {
        dispatch(changeCategorySet(category));
        dispatch(fetchSongsIfNeeded());
    };
}

export function changeCategorySet(category) {
    return {
        type: types.CHANGE_CATEGORY,
        category: category,
        url: constructUrl(category)
    };
}

export function changeNextSong() {
    return (dispatch, getState) => {
        const {songs} = getState();
        const nextIndex = songs.activeSongIndex + 1;
        if (nextIndex < songs.items.length) {
            dispatch(changeActiveSongIndex(nextIndex));
        }
    }
}

export function changePreviousSong() {
    return (dispatch, getState) => {
        const {songs} = getState();
        const prevIndex = songs.activeSongIndex - 1;
        if (prevIndex >= 0) {
            dispatch(changeActiveSongIndex(prevIndex));
        }
    }
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
      songs: json.collection.filter((song) => song.streamable && song.duration < 600000 ),
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
