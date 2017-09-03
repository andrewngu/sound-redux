export const AUTHED_PLAYLIST_SUFFIX = '|authed';
export const SONG_PLAYLIST_SUFFIX = '|song';
export const USER_PLAYLIST_SUFFIX = '|user';

export const GENRE_PLAYLIST_TYPE = 'GENRE_PLAYLIST_TYPE';
export const SEARCH_PLAYLIST_TYPE = 'SEARCH_PLAYLIST_TYPE';

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
