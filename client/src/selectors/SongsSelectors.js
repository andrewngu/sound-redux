import { createSelector } from 'reselect';
import {
  getEntities,
  getGenre,
  getId,
  getOauthToken,
  getPlaylists,
  getSearch,
  getShowLikes,
  getShowPlaylist,
  getShowStream,
  getTime,
} from '../selectors/CommonSelectors';
import { playlistData } from '../utils/PlaylistUtils';

const getPlaylistData = createSelector(
  getGenre,
  getSearch,
  getShowLikes,
  getShowPlaylist,
  getShowStream,
  getTime,
  getEntities,
  getId,
  getOauthToken,
  getPlaylists,
  playlistData,
);

export default getPlaylistData;
