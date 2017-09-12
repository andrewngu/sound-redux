import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { SESSION_STREAM_PLAYLIST } from '../constants/PlaylistConstants';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import { playlistSchema } from '../constants/Schemas';
import { getEntities, getId, getPlaylists, getOauthToken, getPath } from '../selectors/CommonSelectors';

export const getNavPlaylists = createSelector(
  getEntities,
  entities => denormalize(Object.keys(entities.playlists), [playlistSchema], entities),
);

export const getNavPlaylist = createSelector(
  getPath,
  getId,
  getEntities,
  (path, id, entities) => (path === PLAYLIST_PATH && id
    ? denormalize(id, playlistSchema, entities)
    : null
  ),
);

export const getStreamFutureUrl = createSelector(
  getOauthToken,
  getPlaylists,
  (oauthToken, playlists) => (
    SESSION_STREAM_PLAYLIST in playlists && playlists[SESSION_STREAM_PLAYLIST].futureUrl
      ? `${playlists[SESSION_STREAM_PLAYLIST].futureUrl}&oauth_token=${oauthToken}`
      : ''
  ),
);
