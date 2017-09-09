import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { USER_PLAYLIST_TYPE } from '../constants/PlaylistConstants';
import { songSchema, userSchema } from '../constants/Schemas';
import { getEntities, getId, getPlaylists, getSessionFollowings } from '../selectors/CommonSelectors';

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

export const getIsFollowing = createSelector(
  getId,
  getSessionFollowings,
  (id, followings) => Boolean(id in followings && followings[id]),
);

export const getShouldFetchUser = createSelector(
  getId,
  getEntities,
  (id, entities) => {
    const { users } = entities;
    const userExists = id in users;
    const userHasProfiles = userExists ? 'profiles' in users[id] : false;

    return !userExists || !userHasProfiles;
  },
);

export const getProfiles = createSelector(
  getUser,
  user => (user && user.profiles ? user.profiles : []),
);
