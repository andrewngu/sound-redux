import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { CLIENT_ID } from '../constants/ApiConstants';
import { songSchema } from '../constants/Schemas';
import { getEntities, getPlayingIndex, getPlayingSongId, getPlaylist, getPlaylists } from '../selectors/CommonSelectors';

export const getSong = createSelector(
  getEntities,
  getPlayingSongId,
  (entities, playingSongId) => (playingSongId !== null
    ? denormalize(playingSongId, songSchema, entities)
    : null
  ),
);

export const getAudioUrl = createSelector(
  getSong,
  song => (song ? `${song.streamUrl}?client_id=${CLIENT_ID}` : ''),
);

const getPlaylistItemsLength = createSelector(
  getPlaylist,
  getPlaylists,
  (playlist, playlists) => (playlist
    ? playlists[playlist].items.length
    : 0
  ),
);

export const getNextIndex = createSelector(
  getPlaylistItemsLength,
  getPlayingIndex,
  (playlistItemsLength, playingIndex) => (playingIndex === playlistItemsLength - 1
    ? 0
    : playingIndex + 1
  ),
);

export const getPrevIndex = createSelector(
  getPlaylistItemsLength,
  getPlayingIndex,
  (playlistItemsLength, playingIndex) => (playingIndex > 0
    ? playingIndex - 1
    : null
  ),
);

export const getShuffleIndex = (state) => {
  const playlistItemsLength = getPlaylistItemsLength(state);
  const playingIndex = getPlayingIndex(state);

  const randomIndex = Math.floor((Math.random() * (playlistItemsLength - 1)) + 0);
  if (playingIndex === randomIndex) {
    return getShuffleIndex(state);
  }

  return randomIndex;
};
