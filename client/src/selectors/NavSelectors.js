import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import { playlistSchema } from '../constants/Schemas';
import { getEntities, getId, getPath } from '../selectors/CommonSelectors';

export const getPlaylists = createSelector(
  getEntities,
  entities => denormalize(Object.keys(entities.playlists), [playlistSchema], entities),
);

export const getPlaylist = createSelector(
  getPath,
  getId,
  getEntities,
  (path, id, entities) => (path === PLAYLIST_PATH && id
    ? denormalize(id, playlistSchema, entities)
    : null
  ),
);
