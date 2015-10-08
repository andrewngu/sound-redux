import * as types from '../constants/ActionTypes';

export function activeSongId(state = null, action) {
    switch(action.type) {
    case types.CHANGE_ACTIVE_SONG_ID:
        return action.songId;
    default:
        return state;
    }
}

export function songs(state={}, action) {
    switch(action.type) {
    case types.RECEIVE_SONG:
        return Object.assign({}, state, {
            [action.songId]: action.song
        });
    default:
        return state;
    }
}
