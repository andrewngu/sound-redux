import * as types from '../constants/ActionTypes';

export default function activeSongId(state = null, action) {
    switch(action.type) {
    case types.CHANGE_ACTIVE_SONG_ID:
        return action.songId;
    default:
        return state;
    }
}
