import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { USER_PLAYLIST_TYPE } from '../constants/PlaylistConstants';
import { songSchema, userSchema } from '../constants/Schemas';
import { getEntities, getId, getPlaylists } from '../selectors/CommonSelectors';

export const getPlaylist = createSelector(
  getId,
  id => [USER_PLAYLIST_TYPE, id].join('|'),
);

export const getSongs = createSelector(
  getPlaylist,
  getPlaylists,
  getEntities,
  (playlist, playlists, entities) => (playlist in playlists
    ? denormalize(playlists[playlist].items, [songSchema], entities)
    : []
  ),
);

export const getUser = createSelector(
  getId,
  getEntities,
  (id, entities) => (id in entities.users
    ? denormalize(id, userSchema, entities)
    : null
  ),
);
