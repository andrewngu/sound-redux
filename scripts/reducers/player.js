import * as types from '../constants/ActionTypes';

export default function player(state = {
    currentSongIndex: null,
    currentTime: 0,
    selectedPlaylists: [],
}, action) {
    switch(action.type) {
    case types.CHANGE_CURRENT_TIME:
        return Object.assign({}, state, {
            currentTime: action.time
        });

    case types.CHANGE_PLAYING_SONG:
        return Object.assign({}, state, {
            currentSongIndex: action.songIndex
        });

    case types.CHANGE_SELECTED_PLAYLIST:
        return Object.assign({}, state, {
            selectedPlaylists: action.playlists
        });

    default:
        return state;
    }
}
