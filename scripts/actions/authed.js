import {arrayOf, normalize} from 'normalizr';
import SC from 'soundcloud';
import Cookies from 'js-cookie';
import {navigateTo} from '../actions/navigator';
import {fetchSongs, receiveSongs} from '../actions/playlists';
import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';
import {AUTHED_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';
import {playlistSchema, songSchema} from '../constants/Schemas';

const COOKIE_PATH = 'accessToken';

function appendLike(songId) {
    return {
        type: types.APPEND_LIKE,
        songId
    };
}

function authUser(accessToken, shouldShowStream = false) {
    return dispatch => {
        dispatch(receiveAccessToken(accessToken));
        dispatch(fetchAuthedUser(accessToken));
        dispatch(fetchStream(accessToken));
        if (shouldShowStream) {
            dispatch(navigateTo({path: ['me', 'stream']}));
        }
    };
}

function fetchAuthedUser(accessToken) {
    return dispatch => {
        return fetch(`http://api.soundcloud.com/me?oauth_token=${accessToken}`)
            .then(response => response.json())
            .then(json => dispatch(receiveAuthedUserPre(accessToken, json)))
            .catch(error => {throw error});
    };
}

function fetchLikes(accessToken) {
    return dispatch => {
        return fetch(`http://api.soundcloud.com/me/favorites?oauth_token=${accessToken}`)
            .then(response => response.json())
            .then(json => {
                const songs = json.filter(song => song.streamable);
                const normalized = normalize(songs, arrayOf(songSchema));
                const likes = normalized.result
                    .reduce((obj, songId) => Object.assign({}, obj, {[songId]: 1}), {});
                dispatch(receiveLikes(likes));
                dispatch(receiveSongs(normalized.entities, normalized.result, 'likes' + AUTHED_PLAYLIST_SUFFIX, null));
            })
            .catch(error => {throw error});
    };
}

function fetchPlaylists(accessToken) {
    return dispatch => {
        return fetch(`http://api.soundcloud.com/me/playlists?oauth_token=${accessToken}`)
            .then(response => response.json())
            .then(json => {
                const normalized = normalize(json, arrayOf(playlistSchema));
                dispatch(receiveAuthedPlaylists(normalized.result, normalized.entities));
                normalized.result.forEach(playlistId => {
                    const playlist = normalized.entities.playlists[playlistId];
                    dispatch(receiveSongs({}, playlist.tracks, playlist.title + AUTHED_PLAYLIST_SUFFIX, null));
                });
            })
            .catch(error => { throw error; });
    };
}

function fetchStream(accessToken) {
    return dispatch => {
        dispatch(fetchSongs(`http://api.soundcloud.com/me/activities/tracks/affiliated?limit=50&oauth_token=${accessToken}`, 'stream' + AUTHED_PLAYLIST_SUFFIX));
    };
}

export function initAuth() {
    return dispatch => {
        const accessToken = Cookies.get(COOKIE_PATH);
        if (accessToken) {
            return dispatch(authUser(accessToken));
        }
        return null;
    }
}

export function loginUser() {
    return dispatch => {
        SC.initialize({
            client_id: CLIENT_ID,
            redirect_uri: `http://${window.location.host}/api/callback`
        });

        SC.connect().then(authObj => {
            Cookies.set(COOKIE_PATH, authObj.oauth_token);
            dispatch(authUser(authObj.oauth_token, true));
        })
        .catch(error => {
            throw error;
        });
    };
}

export function logoutUser() {
    return (dispatch, getState) => {
        Cookies.remove(COOKIE_PATH);
        const {authed, entities, navigator} = getState();
        const {path} = navigator.route;
        const playlists = authed.playlists.map((playlistId) => {
            return entities.playlists[playlistId].title;
        });

        if (path[0] === 'me') {
            dispatch(navigateTo({path: ['songs']}));
        }

        return dispatch(resetAuthed(playlists));
    }
}

function receiveAccessToken(accessToken) {
    return {
        type: types.RECEIVE_ACCESS_TOKEN,
        accessToken
    };
}

function receiveAuthedUserPre(accessToken, user) {
    return dispatch => {
        dispatch(receiveAuthedUser(user));
        dispatch(fetchLikes(accessToken));
        dispatch(fetchPlaylists(accessToken));
    };
}

function receiveAuthedPlaylists(playlists, entities) {
    return {
        type: types.RECEIVE_AUTHED_PLAYLISTS,
        entities,
        playlists
    };
}

function receiveAuthedUser(user) {
    return {
        type: types.RECEIVE_AUTHED_USER,
        user
    };
}

function receiveLikes(likes) {
    return {
        type: types.RECEIVE_LIKES,
        likes
    };
}

function resetAuthed(playlists) {
    return {
        type: types.RESET_AUTHED,
        playlists: playlists
    };
}

function setLike(songId, liked) {
    return {
        type: types.SET_LIKE,
        liked,
        songId
    };
}

function syncLike(userId, accessToken, songId, liked) {
    fetch(`http://api.soundcloud.com/users/${userId}/favorites/${songId}?oauth_token=${accessToken}`, {method: liked ? 'put' : 'delete'});
}

export function toggleLike(songId) {
    return (dispatch, getState) => {
        const {authed} = getState();
        const {likes} = authed;
        const liked = songId in likes && likes[songId] === 1 ? 0 : 1;
        if (!(songId in likes)) {
            dispatch(appendLike(songId));
        }
        dispatch(setLike(songId, liked));
        syncLike(authed.user.id, authed.accessToken, songId, liked);
    };
}
