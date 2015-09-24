import * as types from '../constants/ActionTypes';

function songs(state = {
    activeSong: null,
    items: [],
}, action) {
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
            items: action.songs,
        });
    default:
        return state;
    }
}

export default songs;
