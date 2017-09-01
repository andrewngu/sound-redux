import * as types from '../constants/ActionTypes';

export const changeCurrentTime = currentTime => ({
  type: types.CHANGE_CURRENT_TIME,
  currentTime,
});

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex,
});

export const toggleIsPlaying = isPlaying => ({
  type: types.TOGGLE_IS_PLAYING,
  isPlaying,
});
