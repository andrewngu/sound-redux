import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { GENRE_PLAYLIST_TYPE, SEARCH_PLAYLIST_TYPE, SESSION_LIKES_PLAYLIST } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { getEntities, getGenre, getPlaylists, getSearch, getShowLikes, getShowStream, getTime } from '../selectors/CommonSelectors';

export const getPlaylist = createSelector(
  getGenre,
  getSearch,
  getShowLikes,
  getShowStream,
  getTime,
  (genre, search, showLikes, showStream, time) => {
    if (showLikes) {
      return SESSION_LIKES_PLAYLIST;
    }

    if (search) {
      return [SEARCH_PLAYLIST_TYPE, search, time].join('|');
    }

    return [GENRE_PLAYLIST_TYPE, genre, time].join('|');
  },
);

export const getIsFetching = createSelector(
  getPlaylist,
  getPlaylists,
  (playlist, playlists) => (playlist in playlists ? playlists[playlist].isFetching : false),
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
