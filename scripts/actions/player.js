import * as types from '../constants/ActionTypes';

export function addSongsToPlaylist(activePlaylist, songs) {
    return {
        type: types.ADD_SONGS_TO_PLAYLIST,
        activePlaylist: activePlaylist,
        songs: songs
    };
}

export function changeActiveSongIndex(activeSongIndex) {
    return {
        type: types.CHANGE_ACTIVE_SONG_INDEX,
        activeSongIndex: activeSongIndex
    };
}

export function playSong(activePlaylist, activeSongIndex, songs) {
    return (dispatch, getState) => {
        const {player} = getState();
        if (player.activePlaylist !== activePlaylist) {
            dispatch(setPlaylistSongs(activePlaylist, songs));
        }
        dispatch(changeActiveSongIndex(activeSongIndex));
    };
}

export function setPlaylistSongs(activePlaylist, songs) {
    return {
        type: types.SET_PLAYLIST_SONGS,
        activePlaylist: activePlaylist,
        lastUpdated: new Date().getTime(),
        songs: songs
    };
}
