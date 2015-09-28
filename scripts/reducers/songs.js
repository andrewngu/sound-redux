import * as types from '../constants/ActionTypes';
import {CLIENT_ID} from '../constants/Config';

const initialState = {
    activeSongIndex: null,
    isFetching: false,
    nextUrl: `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&tags=house&limit=50&offset=0`,
    items: []
};

function songs(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_SONG_INDEX:
        return Object.assign({}, state, {
            activeSongIndex: action.activeSongIndex === state.activeSongIndex ? null : action.activeSongIndex
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

export default songs;
