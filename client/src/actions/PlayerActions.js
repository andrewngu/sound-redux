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

export function changeplaylistHistory(playlists, playlist) {
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
    const { playingIndex, playlistHistory } = player;
    const currentPlaylist = playlistHistory[playlistHistory.length - 1];
    let newSongIndex;

    if (changeType === CHANGE_TYPES.NEXT) {
      newSongIndex = playingIndex + 1;
    } else if (changeType === CHANGE_TYPES.PREV) {
      newSongIndex = playingIndex - 1;
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
    const { playlistHistory } = player;
    const len = playlistHistory.length;
    if (len === 0 || playlistHistory[len - 1] !== playlist) {
      dispatch(changeplaylistHistory(playlistHistory, playlist));
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
