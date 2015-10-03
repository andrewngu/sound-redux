import * as types from '../constants/ActionTypes';

export default function activePlaylist(state = null, action) {
    switch (action.type) {
    case types.CHANGE_ACTIVE_PLAYLIST:
        return action.playlist;
    default:
        return state;
    }
}
