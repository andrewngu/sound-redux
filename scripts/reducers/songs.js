import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

const initialState = {
    activePlaylist: 'house',
    activeSongIndex: null,
    category: 'house',
    isFetching: false,
    nextUrl: constructUrl('house'),
    items: [],
    playlists: {}
};

function playlist(state = {
    isFetching: false,
    items: [],
    nextUrl: null
}, action) {
    switch(action.type) {
    case type.CHANGE_ACTIVE_PLAYLIST:
        return Object.assign({}, state, {
            nextUrl: state.nextUrl ? state.nextUrl : constructUrl(action.activePlaylist)
        });

    default:
        return state;
    }
}

function playlists(state, action) {
    switch(action.type) {
    case types.CHANGE_ACTIVE_PLAYLIST:
        return Object.assign({}, state, {
            [action.activePlaylist]: playlist(state[action.activePlaylist], action)
        });

    default:
        return state;
    }
}

export default function songs(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_PLAYLIST:
        return Object.assign({}, state, {
            activePlaylist: action.activePlaylist,
            playlists: playlists(state.playlists, action)
        });

    case types.CHANGE_CATEGORY:
        return Object.assign({}, state, {
            category: action.category,
            nextUrl: action.url,
            items: []
        });

    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            isFetching: false,
            items: state.items.concat(action.songs),
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
