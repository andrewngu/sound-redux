import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import { songSchema } from '../constants/Schemas';

import { getPlaylists } from '../selectors/CommonSelectors';
import { callApi } from '../utils/ApiUtils';

export const fetchSongsRequest = playlist => ({
  type: types.FETCH_SONGS_REQUEST,
  playlist,
});

export const fetchSongsSuccess = (playlist, items, entities, nextUrl, futureUrl) => ({
  type: types.FETCH_SONGS_SUCCESS,
  entities,
  futureUrl,
  items,
  playlist,
  nextUrl,
});

export const fetchSongs = (playlist, url) => async (dispatch) => {
  dispatch(fetchSongsRequest(playlist));

  const { json } = await callApi(url);

  const collection = json.collection || json;
  const songs = collection
    .map(song => song.origin || song)
    .filter(song => song.kind === 'track' && song.streamable);
  const nextUrl = json.nextHref || null;
  const futureUrl = json.futureHref || null;

  const { result, entities } = normalize(songs, [songSchema]);

  dispatch(fetchSongsSuccess(playlist, result, entities, nextUrl, futureUrl));
};

export const fetchSongsIfNeeded = (playlist, playlistUrl) => (dispatch, getState) => {
  const state = getState();
  const playlists = getPlaylists(state);
  const playlistExists = playlist in playlists;
  const playlistIsFetching = playlistExists ? playlists[playlist].isFetching : false;
  const playlistHasItems = playlistExists ? Boolean(playlists[playlist].items.length) : false;
  const shouldFetchSongs = playlistUrl
     && (!playlistExists || (!playlistHasItems && !playlistIsFetching));

  if (shouldFetchSongs) {
    dispatch(fetchSongs(playlist, playlistUrl));
  }
};

export const fetchSongsNext = (playlist, playlistNextUrl) => (dispatch, getState) => {
  const state = getState();
  const playlists = getPlaylists(state);
  const playlistExists = playlist in playlists;
  const playlistIsFetching = playlistExists ? playlists[playlist].isFetching : false;
  const shouldFetchSongsNext = (playlistExists && !playlistIsFetching && playlistNextUrl);

  if (shouldFetchSongsNext) {
    dispatch(fetchSongs(playlist, playlistNextUrl));
  }
};
