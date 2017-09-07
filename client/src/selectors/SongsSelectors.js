import { createSelector } from 'reselect';
import { getEntities, getGenre, getOauthToken, getPlaylists, getSearch, getShowLikes, getShowStream, getTime } from '../selectors/CommonSelectors';
import { playlistData } from '../utils/PlaylistUtils';

const getPlaylistData = createSelector(
  getGenre,
  getSearch,
  getShowLikes,
  getShowStream,
  getTime,
  getEntities,
  getOauthToken,
  getPlaylists,
  playlistData,
);

export default getPlaylistData;
