import {addSongsToPlaylist} from '../actions/player';
import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

export function changeActivePlaylist(playlist) {
    return {
        type: types.CHANGE_ACTIVE_PLAYLIST,
        playlist: playlist
    };
}

function fetchSongs(url, playlist) {
    return (dispatch, getState) => {
        dispatch(requestSongs(playlist));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                dispatch(receiveSongs(json, playlist));
            });
    };
}

export function fetchSongsIfNeeded(playlist) {
    return (dispatch, getState) => {
        const {playlists, songs} = getState();
        if (shouldFetchSongs(playlists, playlist)) {
            return dispatch(fetchSongs(playlists[playlist].nextUrl, playlist));
        }
    }
}

function receiveSongs(json, playlist) {
    return {
      type: types.RECEIVE_SONGS,
      nextUrl: json.next_href,
      playlist: playlist,
      songs: json.collection.filter((song) => song.streamable && song.duration < 600000 )
    };
}

function requestSongs(playlist) {
    return {
        type: types.REQUEST_SONGS,
        playlist: playlist
    };
}

function shouldFetchSongs(playlists, playlist) {
    if (playlists[playlist].isFetching || !playlists[playlist].nextUrl) {
        return false;
    }

    return true;
}
