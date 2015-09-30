import * as types from '../constants/ActionTypes';
import {constructUrl} from '../helpers/Songs';

const initialState = {
    activePlaylist: null,
    activeSongIndex: null,
    category: 'house',
    isFetching: false,
    nextUrl: constructUrl('house'),
    items: [],
    playlists: {}
};

export default function songs(state = initialState, action) {
    switch (action.type) {
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

    case types.CHANGE_ACTIVE_PLAYLIST:
        return Object.assign({}, state, {
            activePlaylist: action.activePlaylist
        });

    default:
        return state;
    }
}
