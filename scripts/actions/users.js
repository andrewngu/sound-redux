import * as types from '../constants/ActionTypes';
import {constructUserUrl} from '../helpers/UsersHelper';

export function changeActiveUser(userId) {
    return dispatch => {
        dispatch(fetchUserIfNeeded(userId));
        dispatch(changeActiveUserId(userId));
    };
}

function changeActiveUserId(userId) {
    return {
        type: types.CHANGE_ACTIVE_USER_ID,
        userId: userId
    };
}

function fetchUserIfNeeded(userId) {
    return (dispatch, getState) => {
        const {users} = getState();
        if (!(userId in users)) {
            return dispatch(fetchUser(userId));
        }
    };
}

function fetchUser(userId) {
    return dispatch => {
        return fetch(constructUserUrl(userId))
            .then(response => response.json())
            .then(json => dispatch(receiveUser(userId, json)))
            .catch(error => console.log(error));
    }
}

function receiveUser(userId, user) {
    return {
        type: types.RECEIVE_USER,
        user: user,
        userId: user.id
    }
}
