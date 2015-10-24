import {arrayOf, normalize} from 'normalizr';
import merge from 'lodash/object/merge';
import * as types from '../constants/ActionTypes';
import {songSchema, userSchema} from '../constants/Schemas';

import {
    constructUserFollowingsUrl,
    constructUserTracksUrl,
    constructUserUrl,
    constructUserProfilesUrl
} from '../utils/UserUtils';

function fetchUserData(userId, username) {
    return dispatch => {
        dispatch(fetchUserTracks(userId, username));
        dispatch(fetchUserFollowings(userId));
        dispatch(fetchUserProfiles(userId));
    }
}

export function fetchUserIfNeeded(userId) {
    return (dispatch, getState) => {
        const {entities} = getState();
        const {users} = entities;
        if (!(userId in users) || !users[userId].description) {
            return dispatch(fetchUser(userId));
        } else if (!('followings' in users[userId])) {
            return dispatch(fetchUserData(userId, users[userId].username));
        }
    };
}

function fetchUser(userId) {
    return dispatch => {
        dispatch(requestUser(userId));
        return fetch(constructUserUrl(userId))
            .then(response => response.json())
            .then(json => {
                const normalized = normalize(json, userSchema);
                dispatch(receiveUserPre(userId, normalized.entities));
            })
            .catch(error => console.log(error));
    };
}

function fetchUserFollowings(userId) {
    return dispatch => {
        return fetch(constructUserFollowingsUrl(userId))
            .then(response => response.json())
            .then(json => {
                const users = json.sort((a, b) => b.followers_count - a.followers_count);
                const normalized = normalize(users, arrayOf(userSchema));
                const entities = merge({}, normalized.entities, {
                    users: {
                        [userId]: {
                            followings: normalized.result
                        }
                    }
                });
                dispatch(receiveUserFollowings(entities));
            })
            .catch(error => console.log(error));
    };
}

function fetchUserProfiles(userId) {
    return dispatch => {
        return fetch(constructUserProfilesUrl(userId))
            .then(response => response.json())
            .then(json => {
                const entities = {users: {[userId]: {profiles: json}}};
                dispatch(receiveUserProfiles(entities))
            })
            .catch(error => console.log(error));
    };
}

function fetchUserTracks(userId, username) {
    return dispatch => {
        return fetch(constructUserTracksUrl(userId))
            .then(response => response.json())
            .then(json => {
                const normalized = normalize(json, arrayOf(songSchema))
                dispatch(receiveSongs(normalized.result, normalized.entities, username))
            })
            .catch(error => console.log(error));
    };
}

export function receiveSongs(songs, entities, playlist) {
    return {
        type: types.RECEIVE_SONGS,
        entities,
        nextUrl: null,
        playlist,
        songs
    };
}

export function receiveUserFollowings(entities) {
    return {
        type: types.RECEIVE_USER_FOLLOWINGS,
        entities
    };
}

function receiveUserPre(userId, entities) {
    return dispatch => {
        dispatch(receiveUser(entities));
        dispatch(fetchUserData(userId, entities.users[userId].username));
    };
}

export function receiveUser(entities) {
    return {
        type: types.RECEIVE_USER,
        entities
    };
}

export function receiveUserProfiles(entities) {
    return {
        type: types.RECEIVE_USER_PROFILES,
        entities
    };
}

export function requestUser(userId) {
    return {
        type: types.REQUEST_USER,
        userId: userId
    };
}
