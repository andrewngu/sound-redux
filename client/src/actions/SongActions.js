import { normalize } from 'normalizr';
import { fetchSongs, fetchSongsSuccess } from '../actions/PlaylistActions';
import * as types from '../constants/ActionTypes';
import { SONG_URL, SONG_COMMENTS_URL, USER_SONGS_URL } from '../constants/ApiConstants';
import { songSchema } from '../constants/Schemas';
import { callApi } from '../utils/ApiUtils';

const fetchSongCommentsSuccess = (id, comments) => ({
  type: types.FETCH_SONG_COMMENTS_SUCCESS,
  entities: {
    songs: {
      [id]: { comments },
    },
  },
});

const fetchSongComments = id => async (dispatch) => {
  const { json } = await callApi(SONG_COMMENTS_URL.replace(':id', id));
  const comments = json
    .map(comment => ({
      ...comment,
      unixTimestamp: Math.floor(comment.timestamp / 1000),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  dispatch(fetchSongCommentsSuccess(id, comments));
};

const fetchSong = (id, playlist) => async (dispatch) => {
  const { json } = await callApi(SONG_URL.replace(':id', id));
  const { userId } = json;

  const { entities, result } = normalize(json, songSchema);
  dispatch(fetchSongsSuccess(playlist, [result], entities, null, null));
  dispatch(fetchSongComments(id));
  dispatch(fetchSongs(playlist, USER_SONGS_URL.replace(':id', userId)));
};

const shouldFetchSong = (id, state) => {
  const { entities } = state;
  const { songs } = entities;
  const songExists = id in songs;
  const songHasComments = songExists ? 'comments' in songs[id] : false;

  return !songExists || !songHasComments;
};

const fetchSongIfNeeded = (id, playlist) => (dispatch, getState) => {
  if (shouldFetchSong(id, getState())) {
    dispatch(fetchSong(id, playlist));
  }
};

export default fetchSongIfNeeded;
