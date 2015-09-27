import * as types from '../constants/ActionTypes';

const initialState = {
    activeSong: null,
    isFetching: false,
    nextUrl: true,
    items: []
};

function songs(state = initialState, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_SONG:
        if (action.song === null) {
            return Object.assign({}, state, {activeSong: null});
        }
        return Object.assign({}, state, {
            activeSong: action.song
        });

    case types.RECEIVE_SONGS:
        return Object.assign({}, state, {
            isFetching: false,
            items: action.songs,
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
