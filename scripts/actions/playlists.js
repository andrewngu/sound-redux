import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

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
            const nextUrl = getNextUrl(playlists, playlist);
            return dispatch(fetchSongs(nextUrl, playlist));
        }
    }
}

function getNextUrl(playlists, playlist) {
    const activePlaylist = playlists[playlist];
    if (!activePlaylist || !activePlaylist.nextUrl) {
        return constructUrl(playlist);
    }
    return activePlaylist.nextUrl;
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
    const activePlaylist = playlists[playlist];
    if (!activePlaylist || !activePlaylist.isFetching) {
        return true;
    }

    return false;
}
