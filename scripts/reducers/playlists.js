import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/SongsHelper';

export function activePlaylist(state = null, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_PLAYLIST:
        return action.playlist;
    default:
        return state;
    }
}

function playlist(state = {
    isFetching: false,
    items: [],
    nextUrl: false
}, action) {
    switch(action.type) {
    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            isFetching: false,
            items: [...state.items, ...action.songs],
            nextUrl: action.nextUrl
        });

    case types.REQUEST_SONGS:
        return Object.assign({}, state, {
            isFetching: true,
            nextUrl: null
        });

    default:
        return state;
    }
}

export function playlists(state = {}, action) {
    switch(action.type) {
    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });

    case types.REQUEST_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });
    default:
        return state;
    }
}
