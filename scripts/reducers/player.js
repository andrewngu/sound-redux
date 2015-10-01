import * as types from '../constants/ActionTypes';

export default function player(state = {
    activeSongIndex: null,
    selectedPlaylists: [],
}, action) {
    switch(action.type) {
    case types.CHANGE_ACTIVE_SONG_INDEX:
        return Object.assign({}, state, {
            activeSongIndex: action.activeSongIndex
        });

    case types.CHANGE_SELECTED_PLAYLIST:
        return Object.assign({}, state, {
            selectedPlaylists: action.playlists
        });

    default:
        return state;
    }
}
