import * as types from '../constants/ActionTypes';
import merge from 'lodash/object/merge';
import {constructUrl} from '../utils/SongUtils';

const initialPlaylistState = {
    isFetching: false,
    items: [],
    nextUrl: false
};

function playlist(state = initialPlaylistState, action) {
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

const initialState = {
    likes: {isFetching: false, items: [], nextUrl: null},
    stream: {isFetching: false, items: [], nextUrl: null}
};

export default function playlists(state = initialState, action) {
    switch(action.type) {
    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });

    case types.REQUEST_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });

    case types.RESET_AUTHED:
        const playlists = [...action.playlists, 'stream', 'likes'];
        const newState = playlists.reduce((obj, playlist) => merge({}, obj, {[playlist]: initialPlaylistState}), {});
        return Object.assign({}, state, newState);

    default:
        return state;
    }
}
