import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import {changeActiveUser} from '../actions/users';
import * as types from '../constants/ActionTypes';

function changePath(path) {
    return {
        type: types.CHANGE_PATH,
        path: path
    };
}

export function navigateBack(e) {
    return dispatch => {
        if (e.state) {
            return dispatch(navigateTo(e.state.path, false));
        }
    }
}

export function navigateTo(path, shouldPushState = true) {
    return dispatch => {
        if (path[0] === 'songs' && path.length === 2) {
            dispatch(changeActiveSong(path[1]));

        } else if (path[0] === 'users' && path.length === 2) {
            dispatch(changeActiveUser(path[1]));
        }

        if (shouldPushState) {
            pushState(path);
        }
        return dispatch(changePath(path))
    }
}

function pushState(path) {
    history.pushState({path: path}, '', '#/' + path.join('/'));
}
