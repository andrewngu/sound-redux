import * as types from '../constants/ActionTypes';
import {
    constructUserFollowingsUrl,
    constructUserTracksUrl,
    constructUserUrl,
    constructUserProfilesUrl} from '../helpers/UsersHelper';

export function changeActiveUser(userId) {
    return dispatch => {
        dispatch(fetchUserIfNeeded(userId));
        dispatch(changeActiveUserId(userId));
    };
}

export function changeActiveUserId(userId) {
    return {
        type: types.CHANGE_ACTIVE_USER_ID,
        userId
    };
}

export function fetchUserIfNeeded(userId) {
    return (dispatch, getState) => {
        const {users} = getState();
        if (!(userId in users)) {
            return dispatch(fetchUser(userId));
        }
    };
}

function fetchUser(userId) {
    return dispatch => {
        dispatch(requestUser(userId));
        return fetch(constructUserUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveUserPre(userId, json)))
            .catch(error => console.log(error));
    };
}

function fetchUserFollowings(userId) {
    return dispatch => {
        return fetch(constructUserFollowingsUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveUserFollowings(userId, json)))
            .catch(error => console.log(error));
    };
}

function fetchUserProfiles(userId) {
    return dispatch => {
        return fetch(constructUserProfilesUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveUserProfiles(userId, json)))
            .catch(error => console.log(error));
    };
}

function fetchUserTracks(userId, username) {
    return dispatch => {
        return fetch(constructUserTracksUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveSongs(json, username)))
            .catch(error => console.log(error));
    };
}

export function receiveSongs(songs, playlist) {
    return {
        type: types.RECEIVE_SONGS,
        nextUrl: null,
        playlist,
        songs
    };
}

export function receiveUserFollowings(userId, users) {
    return {
        type: types.RECEIVE_USER_FOLLOWINGS,
        userId,
        users,
    };
}

function receiveUserPre(userId, user) {
    return dispatch => {
        dispatch(receiveUser(user));
        dispatch(fetchUserTracks(userId, user.username));
        dispatch(fetchUserFollowings(userId));
        dispatch(fetchUserProfiles(userId));
    };
}

export function receiveUser(user) {
    return {
        type: types.RECEIVE_USER,
        user: user,
        userId: user.id
    };
}

export function receiveUserProfiles(userId, profiles) {
    return {
        type: types.RECEIVE_USER_PROFILES,
        userId: userId,
        profiles: profiles
    };
}

export function requestUser(userId) {
    return {
        type: types.REQUEST_USER,
        userId: userId
    };
}
