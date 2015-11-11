import * as types from '../constants/ActionTypes';
import {AUTHED_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';
import merge from 'lodash/object/merge';
import {constructUrl} from '../utils/SongUtils';

const initialPlaylistState = {
    isFetching: false,
    items: [],
    futureUrl: false,
    nextUrl: false
};

function playlist(state = initialPlaylistState, action) {
    switch(action.type) {
    case types.APPEND_LIKE:
        return Object.assign({}, state, {
            items: [action.songId, ...state.items]
        });

    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            isFetching: false,
            items: [...state.items, ...action.songs],
            futureUrl: action.futureUrl,
            nextUrl: action.nextUrl
        });

    case types.RECEIVE_NEW_STREAM_SONGS:
        return Object.assign({}, state, {
            futureUrl: action.futureUrl
        });

    case types.REQUEST_SONGS:
        return Object.assign({}, state, {
            isFetching: true,
            nextUrl: null
        });

    case types.UNSHIFT_NEW_STREAM_SONGS:
        return Object.assign({}, state, {
            items: [...action.songs, ...state.items],
        });

    default:
        return state;
    }
}

const initialState = {
    ['likes' + AUTHED_PLAYLIST_SUFFIX]: {isFetching: false, items: [], nextUrl: null},
    ['stream' + AUTHED_PLAYLIST_SUFFIX]: {isFetching: false, items: [], nextUrl: null}
};

export default function playlists(state = initialState, action) {
    switch(action.type) {
    case types.APPEND_LIKE:
        return Object.assign({}, state, {
            ['likes' + AUTHED_PLAYLIST_SUFFIX]: playlist(state['likes' + AUTHED_PLAYLIST_SUFFIX], action)
        });

    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });

    case types.RECEIVE_NEW_STREAM_SONGS:
        return Object.assign({}, state, {
            ['stream' + AUTHED_PLAYLIST_SUFFIX]: playlist(state['stream' + AUTHED_PLAYLIST_SUFFIX], action)
        });

    case types.REQUEST_SONGS:
        return Object.assign({}, state, {
            [action.playlist]: playlist(state[action.playlist], action)
        });

    case types.RESET_AUTHED:
        const playlists = [...action.playlists, 'stream', 'likes'];
        const newState = playlists.reduce((obj, playlist) => merge({}, obj, {[playlist]: initialPlaylistState}), {});
        return Object.assign({}, state, newState);

    case types.UNSHIFT_NEW_STREAM_SONGS:
        return Object.assign({}, state, {
            ['stream' + AUTHED_PLAYLIST_SUFFIX]: playlist(state['stream' + AUTHED_PLAYLIST_SUFFIX], action)
        });

    default:
        return state;
    }
}
