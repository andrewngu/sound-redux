import * as types from '../constants/ActionTypes';

export function activeSongId(state = null, action) {
    switch(action.type) {
        case action.CHANGE_ACTIVE_SONG_ID:
            return action.activeSongId;
        default:
            return state;
    }
}

export function songs(state={}, action) {
    switch(action.type) {
        case action.RECEIVE_SONG:
            return Object.assign({}, state, {
                [action.songId]: action.song
            });
        default:
            return state;
    }
}
