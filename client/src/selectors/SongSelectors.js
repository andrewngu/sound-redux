import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { SONG_PLAYLIST_TYPE } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { getCurrentTime, getEntities, getId, getPlayingSongId } from '../selectors/CommonSelectors';

export const getSong = createSelector(
  getEntities,
  getId,
  (entities, id) => (id in entities.songs ? denormalize(id, songSchema, entities) : null),
);

export const getIsActive = createSelector(
  getPlayingSongId,
  getId,
  (playingSongId, id) => playingSongId === id,
);

export const getSongComments = createSelector(
  getSong,
  song => (song && song.comments
    ? song.comments
    : []
  ),
);

export const getPlaylist = createSelector(
  getId,
  id => `${SONG_PLAYLIST_TYPE}|${id}`,
);

export const getTimed = state => Boolean(state.router.route.options.timed) || false;

export const getComments = createSelector(
  getIsActive,
  getTimed,
  getSongComments,
  getCurrentTime,
  (isActive, timed, comments, currentTime) => {
    if (isActive && timed) {
      const start = currentTime - (currentTime % 10);
      const end = start + 10;
      return comments.filter(({ unixTimestamp }) => unixTimestamp >= start && unixTimestamp < end);
    }

    return comments;
  },
);
