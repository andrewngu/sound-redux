import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import {changeActiveUser} from '../actions/users';
import * as types from '../constants/ActionTypes';

export function changePath(path) {
    return {
        type: types.CHANGE_PATH,
        path
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
        if (shouldPushState) {
            pushState(path);
        }
        return dispatch(changePath(path))
    }
}

function pushState(path) {
    history.pushState({path: path}, '', '#/' + path.join('/'));
}
