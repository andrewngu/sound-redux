import * as types from '../constants/ActionTypes';

function changeActiveSongIndex(songIndex) {
    return {
        type: types.CHANGE_ACTIVE_SONG_INDEX,
        activeSongIndex: songIndex
    };
}

function changeSelectedPlaylist(playlists, playlist) {
    const index = playlists.indexOf(playlist);
    if (index > -1) {
        playlists.splice(index, 1);
    }
    playlists.push(playlist);

    return {
        type: types.CHANGE_SELECTED_PLAYLIST,
        playlists: playlists
    }
}

export function changeSong(playNext) {
    return (dispatch, getState) => {
        const {player, playlists} = getState();
        const {activeSongIndex, selectedPlaylists} = player;
        const activePlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        const newActiveIndex = playNext ? activeSongIndex + 1 : activeSongIndex - 1;
        if (newActiveIndex < playlists[activePlaylist].items.length && newActiveIndex >= 0) {
            dispatch(changeActiveSongIndex(newActiveIndex));
        }
    }
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
