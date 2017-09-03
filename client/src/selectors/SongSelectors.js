import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { SONG_PLAYLIST_TYPE } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { getEntities, getId } from '../selectors/CommonSelectors';

export const getSong = createSelector(
  getEntities,
  getId,
  (entities, id) => (id in entities.songs ? denormalize(id, songSchema, entities) : null),
);

export const getPlaylist = createSelector(
  getId,
  id => `${SONG_PLAYLIST_TYPE}|${id}`,
);
