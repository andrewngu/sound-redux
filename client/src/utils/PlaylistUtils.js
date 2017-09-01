import moment from 'moment';
import { CLIENT_ID } from '../constants/Config';
import { GENRE_PLAYLIST_TYPE } from '../constants/PlaylistConstants';

const API_HOSTNAME = '//api.soundcloud.com';

const genrePlaylistUrl = (playlist) => {
  const [genre, time] = playlist.split('|').slice(1);

  const genreUriSegment = `&tags=${genre}`;
  const timeUriSegment = time ? `&created_at[from]=${moment().subtract(time, 'days').format('YYYY-MM-DD%2012:00:00')}` : '';

  return `${API_HOSTNAME}/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&limit=50&offset=0${timeUriSegment}${genreUriSegment}`;
};

const playlistUrl = (playlist) => {
  const [type] = playlist.split('|');

  switch (type) {
    case GENRE_PLAYLIST_TYPE:
      return genrePlaylistUrl(playlist);
    default:
      return '';
  }
};

export default playlistUrl;
