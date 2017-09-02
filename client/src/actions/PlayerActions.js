import * as types from '../constants/ActionTypes';

export const changeCurrentTime = currentTime => ({
  type: types.CHANGE_CURRENT_TIME,
  currentTime,
});

export const loadedMetadata = duration => ({
  type: types.LOADED_METADATA,
  duration,
});

export const loadStart = () => ({
  type: types.LOAD_START,
});

export const playSong = (playlist, playingIndex) => ({
  type: types.PLAY_SONG,
  playlist,
  playingIndex,
});

export const pause = () => ({
  type: types.PAUSE,
});

export const play = () => ({
  type: types.PLAY,
});

export const timeUpdate = currentTime => ({
  type: types.TIME_UPDATE,
  currentTime,
});

export const toggleIsPlaying = isPlaying => ({
  type: types.TOGGLE_IS_PLAYING,
  isPlaying,
});

export const volumeChange = volume => ({
  type: types.VOLUME_CHANGE,
  volume,
});
