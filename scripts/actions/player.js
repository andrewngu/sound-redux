import * as types from '../constants/ActionTypes';

export function addSongsToPlaylist(activePlaylist, songs) {
    return {
        type: types.ADD_SONGS_TO_PLAYLIST,
        activePlaylist: activePlaylist,
        songs: songs
    };
}

export function playSong(activePlaylist, activeSongIndex, songs) {
    return {
        type: types.PLAY_SONG,
        activePlaylist: activePlaylist,
        activeSongIndex: activeSongIndex,
        lastUpdated: new Date().getTime(),
        songs: songs
    };
}
