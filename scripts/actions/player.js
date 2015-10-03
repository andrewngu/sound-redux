import * as types from '../constants/ActionTypes';

function changeCurrentSong(songIndex) {
    return {
        type: types.CHANGE_CURRENT_SONG,
        songIndex: songIndex
    };
}

function changeSelectedPlaylists(playlists, playlist) {
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

export function changeSong(changeType) {
    return (dispatch, getState) => {
        const {player, playlists} = getState();
        const {currentSongIndex, selectedPlaylists} = player;
        const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        let newSongIndex;

        if (changeType === 'next') {
            newSongIndex = currentSongIndex + 1;
        } else if (changeType === 'prev') {
            newSongIndex = currentSongIndex - 1;
        } else if (changeType === 'shuffle') {
            newSongIndex = Math.floor((Math.random() * playlists[currentPlaylist].items.length - 1) + 0);
        }

        if (newSongIndex >= playlists[currentPlaylist].items.length ||  newSongIndex < 0) {
            return null;
        }

        return dispatch(changeCurrentSong(newSongIndex));
    }
}

export function playSong(playlist, songIndex) {
    return (dispatch, getState) => {
        const {player} = getState();
        const {selectedPlaylists} = player;
        const len = selectedPlaylists.length;
        if (len === 0 || selectedPlaylists[len - 1] !== playlist) {
            dispatch(changeSelectedPlaylists(selectedPlaylists, playlist));
        }
        dispatch(changeCurrentSong(songIndex));
    };
}
