import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { HISTORY_PLAYLIST } from '../constants/PlaylistConstants';
import { songSchema } from '../constants/Schemas';
import { getEntities, getPlaylists } from '../selectors/CommonSelectors';

export const getSongs = createSelector(
  getPlaylists,
  getEntities,
  (playlists, entities) => (HISTORY_PLAYLIST in playlists
    ? denormalize(playlists[HISTORY_PLAYLIST].items, [songSchema], entities)
    : []
  ),
);

export const getShowHistory = state => state.history.showHistory;
