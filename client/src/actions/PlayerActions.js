import * as types from '../constants/ActionTypes';
import { CHANGE_TYPES } from '../constants/SongConstants';

export function changeCurrentTime(time) {
  return {
    type: types.CHANGE_CURRENT_TIME,
    time,
  };
}

export function changePlayingSong(songIndex) {
  return {
    type: types.CHANGE_PLAYING_SONG,
    songIndex,
  };
}

export function changeSelectedPlaylists(playlists, playlist) {
  const index = playlists.indexOf(playlist);
  if (index > -1) {
    playlists.splice(index, 1);
  }
  playlists.push(playlist);

  return {
    type: types.CHANGE_SELECTED_PLAYLISTS,
    playlists,
  };
}

export function changeSong(changeType) {
  return (dispatch, getState) => {
    const { player, playlists } = getState();
    const { currentSongIndex, selectedPlaylists } = player;
    const currentPlaylist = selectedPlaylists[selectedPlaylists.length - 1];
    let newSongIndex;

    if (changeType === CHANGE_TYPES.NEXT) {
      newSongIndex = currentSongIndex + 1;
    } else if (changeType === CHANGE_TYPES.PREV) {
      newSongIndex = currentSongIndex - 1;
    } else if (changeType === CHANGE_TYPES.SHUFFLE) {
      newSongIndex = Math.floor((Math.random() * playlists[currentPlaylist].items.length - 1) + 0);
    }

    if (newSongIndex >= playlists[currentPlaylist].items.length || newSongIndex < 0) {
      return null;
    }

    return dispatch(changePlayingSong(newSongIndex));
  };
}

export function playSong(playlist, songIndex) {
  return (dispatch, getState) => {
    dispatch(changeCurrentTime(0));

    const { player } = getState();
    const { selectedPlaylists } = player;
    const len = selectedPlaylists.length;
    if (len === 0 || selectedPlaylists[len - 1] !== playlist) {
      dispatch(changeSelectedPlaylists(selectedPlaylists, playlist));
    }

    dispatch(changePlayingSong(songIndex));
  };
}

export function toggleIsPlaying(isPlaying) {
  return {
    type: types.TOGGLE_IS_PLAYING,
    isPlaying,
  };
}
