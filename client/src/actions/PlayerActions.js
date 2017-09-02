import * as types from '../constants/ActionTypes';

export const changeCurrentTime = currentTime => ({
  type: types.CHANGE_CURRENT_TIME,
  currentTime,
});

export const onLoadedMetadata = duration => ({
  type: types.ON_LOADED_METADATA,
  duration,
});

export const onLoadStart = () => ({
  type: types.ON_LOAD_START,
});

export const onPause = () => ({
  type: types.ON_PAUSE,
});

export const onPlay = () => ({
  type: types.ON_PLAY,
});

export const onTimeUpdate = currentTime => ({
  type: types.ON_TIME_UPDATE,
  currentTime,
});

export const onVolumeChange = volume => ({
  type: types.ON_VOLUME_CHANGE,
  volume,
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
