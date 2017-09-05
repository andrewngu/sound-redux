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

export const getFollowings = createSelector(
  getUser,
  getEntities,
  (user, entities) => (user && user.followings
    ? denormalize(user.followings, [userSchema], entities)
    : []
  ),
);

export const getShouldFetchUser = createSelector(
  getId,
  getEntities,
  (id, entities) => {
    const { users } = entities;
    const userExists = id in users;
    const userHasDescription = userExists ? 'description' in users[id] : false;

    return !userExists || !userHasDescription;
  },
);

export const getProfiles = createSelector(
  getUser,
  user => (user && user.profiles ? user.profiles : []),
);
