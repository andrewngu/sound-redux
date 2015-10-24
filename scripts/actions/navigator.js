import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import {changeActiveUser} from '../actions/users';
import * as types from '../constants/ActionTypes';
import {constructUrl} from '../utils/RouteUtils';

export function changePath(route) {
    return {
        type: types.CHANGE_PATH,
        route: route
    };
}

export function navigateBack(e) {
    return dispatch => {
        if (e.state) {
            return dispatch(navigateTo(e.state.route, false));
        }
    }
}

export function navigateTo(route, shouldPushState = true) {
    return (dispatch, getState) => {
        const {navigator} = getState();
        if (constructUrl(route) === constructUrl(navigator.route)) {
            return;
        }

        if (shouldPushState) {
            pushState(route);
        }
        return dispatch(changePath(route))
    }
}

function pushState(route) {
    history.pushState({route}, '', '#/' + constructUrl(route));
}
