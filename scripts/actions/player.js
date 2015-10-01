import * as types from '../constants/ActionTypes';

export function changeActiveSongIndex(songIndex) {
    return {
        type: types.CHANGE_ACTIVE_SONG_INDEX,
        activeSongIndex: songIndex
    };
}

export function playSong(playlist, songIndex, songs) {
    return (dispatch, getState) => {
        const {player} = getState();
        const {selectedPlaylists} = player;
        const len = selectedPlaylists.length;
        if (len === 0 || selectedPlaylists[len - 1] !== playlist) {
            dispatch(changeSelectedPlaylist(selectedPlaylists, playlist));
        }
        dispatch(changeActiveSongIndex(songIndex));
    };
}

export function changeSelectedPlaylist(playlists, playlist) {
    const index = playlists.indexOf(playlist);
    if (index > -1) {
        playlists.slice(index, 1);
    }
    playlists.push(playlist);

    return {
        type: types.CHANGE_SELECTED_PLAYLIST,
        playlists: playlists
    }
}
