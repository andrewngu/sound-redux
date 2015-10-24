import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import {changeActiveUser} from '../actions/users';
import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/UrlHelper';

export function changePath(path, query) {
    return {
        type: types.CHANGE_PATH,
        path,
        query
    };
}

export function navigateBack(e) {
    return dispatch => {
        if (e.state) {
            return dispatch(navigateTo(e.state.path, e.state.query, false));
        }
    }
}

export function navigateTo(path, query, shouldPushState = true) {
    return (dispatch, getState) => {
        const {navigator} = getState();
        if (constructUrl(path, query) === constructUrl(navigator.path, navigator.query)) {
            return;
        }

        if (shouldPushState) {
            pushState(path, query);
        }
        return dispatch(changePath(path, query))
    }
}

function pushState(path, query) {
    history.pushState({path, query}, '', '#/' + constructUrl(path, query));
}
