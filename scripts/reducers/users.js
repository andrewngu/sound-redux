import * as types from '../constants/ActionTypes';

export function activeUserId(state = null, action) {
    switch(action.type) {
    case types.CHANGE_ACTIVE_USER_ID:
        return action.userId;

    default:
        return state;
    }
}

function user(state = {}, action) {
    switch(action.type) {
    case types.RECEIVE_USER:
        return Object.assign({}, action.user, {
            isFetching: false
        });

    case types.RECEIVE_USER_FOLLOWINGS:
        return Object.assign({}, state, {
            followings: [...action.users]
        });

    case types.REQUEST_USER:
        return Object.assign({}, state, {
            isFetching: true
        });

    default:
        return state;
    }
}

export function users(state = {}, action) {
    switch(action.type) {
    case types.RECEIVE_USER:
        return Object.assign({}, state, {
            [action.userId]: user(state[action.userId], action)
        });

    case types.RECEIVE_USER_FOLLOWINGS:
        return Object.assign({}, state, {
            [action.userId]: user(state[action.userId], action)
        });

    case types.REQUEST_USER:
        return Object.assign({}, state, {
            [action.userId]: user(state[action.userId], action)
        });
    default:
        return state;
    }
}
