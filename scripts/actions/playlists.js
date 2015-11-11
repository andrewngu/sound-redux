import fetch from 'isomorphic-fetch';
import {arrayOf, normalize} from 'normalizr';
import * as types from '../constants/ActionTypes';
import {songSchema} from '../constants/Schemas';
import {GENRES_MAP} from '../constants/SongConstants';
import {constructUrl} from '../utils/SongUtils';

export function fetchSongs(url, playlist) {
    return (dispatch, getState) => {
        const {authed} = getState();
        dispatch(requestSongs(playlist));
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                let nextUrl = null;
                let futureUrl = null;
                if (json.next_href) {
                    nextUrl = json.next_href + ( authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
                }

                if (json.future_href) {
                    futureUrl = json.future_href + ( authed.accessToken ? `&oauth_token=${authed.accessToken}` : '');
                }

                const songs = json.collection
                    .map(song => song.origin ? song.origin : song)
                    .filter(song => {
                        if (playlist in GENRES_MAP) {
                            return song.streamable && song.kind === 'track' && song.duration < 600000;
                        }
                        return song.streamable && song.kind === 'track';
                    });
                const normalized = normalize(songs, arrayOf(songSchema));
                const result = normalized.result.reduce((arr, songId) => {
                    if (arr.indexOf(songId) === -1) {
                        arr.push(songId);
                    }
                    return arr;
                }, []);
                dispatch(receiveSongs(normalized.entities, result, playlist, nextUrl, futureUrl));
            })
            .catch(error => {throw error});
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
    if (!activePlaylist || activePlaylist.nextUrl === false) {
        return constructUrl(playlist);
    }
    return activePlaylist.nextUrl;
}

export function receiveSongs(entities, songs, playlist, nextUrl, futureUrl) {
    return {
        type: types.RECEIVE_SONGS,
        entities,
        futureUrl,
        nextUrl,
        playlist,
        songs
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
    if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null)) {
        return true;
    }

    return false;
}
