export const GENRE_PLAYLIST_TYPE = 'GENRE_PLAYLIST_TYPE';
export const PLAYLIST_PLAYLIST_TYPE = 'PLAYLIST_PLAYLIST_TYPE';
export const SEARCH_PLAYLIST_TYPE = 'SEARCH_PLAYLIST_TYPE';
export const SONG_PLAYLIST_TYPE = 'SONG_PLAYLIST_TYPE';
export const SESSION_PLAYLIST_TYPE = 'SESSION_PLAYLIST_TYPE';
export const USER_PLAYLIST_TYPE = 'USER_PLAYLIST_TYPE';

export const HISTORY_PLAYLIST = 'HISTORY_PLAYLIST';
export const SESSION_LIKES_PLAYLIST = `${SESSION_PLAYLIST_TYPE}|LIKES`;
export const SESSION_STREAM_PLAYLIST = `${SESSION_PLAYLIST_TYPE}|STREAM`;

export const GENRES = [
  { key: 'chill', query: 'chill house' },
  { key: 'deep', query: 'deep house' },
  { key: 'dubstep', query: 'dubstep' },
  { key: 'house', query: 'house' },
  { key: 'progressive', query: 'progressive house' },
  { key: 'tech', query: 'tech house' },
  { key: 'trance', query: 'trance' },
  { key: 'tropical', query: 'tropical house' },
];

export const GENRE_QUERY_MAP = GENRES.reduce((obj, genre) => ({
  ...obj,
  [genre.key]: genre.query,
}), {});

export const TIMES = [
  { key: '7', label: '7 days' },
  { key: '30', label: '30 days' },
  { key: '90', label: '90 days' },
];
