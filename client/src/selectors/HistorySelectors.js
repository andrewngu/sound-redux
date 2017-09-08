import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { songSchema } from '../constants/Schemas';
import { getEntities } from '../selectors/CommonSelectors';

const getHistorySongs = state => state.history.songs;

export const getSongs = createSelector(
  getHistorySongs,
  getEntities,
  (songs, entities) => denormalize(songs, [songSchema], entities),
);

export const getShowHistory = state => state.history.showHistory;
