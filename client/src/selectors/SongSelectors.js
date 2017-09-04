import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { SONG_PLAYLIST_TYPE } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { getCurrentTime, getEntities, getId } from '../selectors/CommonSelectors';

const COMMENTS_TIMED_WINDOW = 10;

export const getSong = createSelector(
  getEntities,
  getId,
  (entities, id) => (id in entities.songs ? denormalize(id, songSchema, entities) : null),
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
export const getTimedRange = createSelector(
  getCurrentTime,
  (currentTime) => {
    const start = currentTime - (currentTime % COMMENTS_TIMED_WINDOW);
    const end = currentTime + COMMENTS_TIMED_WINDOW;

    return {
      start,
      end,
    };
  },
);

export const getComments = createSelector(
  getSongComments,
  getTimed,
  getTimedRange,
  (comments, timed, timedRange) => (timed
    ? comments.filter(comment =>
      comment.unixTimestamp >= timedRange.start
      && comment.unixTimestamp < timedRange.end)
    : comments
  ),
);
