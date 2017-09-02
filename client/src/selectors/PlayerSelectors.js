import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { songSchema } from '../constants/Schemas';
import { getEntities, getPlayingSongId } from '../selectors/CommonSelectors';

const getSong = createSelector(
  getEntities,
  getPlayingSongId,
  (entities, playingSongId) => (playingSongId !== null
    ? denormalize(playingSongId, songSchema, entities)
    : null
  ),
);

export default getSong;
