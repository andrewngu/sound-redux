import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import { songSchema } from '../constants/Schemas';

import { getAccessToken, getPlaylists } from '../selectors/CommonSelectors';
import callApi from '../utils/ApiUtils';
import playlistUrl from '../utils/PlaylistUtils';

const fetchSongsRequest = playlist => ({
  type: types.FETCH_SONGS_REQUEST,
  playlist,
});

export const fetchSongSuccess = (playlist, items, entities, nextUrl, futureUrl) => ({
  type: types.FETCH_SONGS_SUCCESS,
  entities,
  futureUrl,
  items,
  playlist,
  nextUrl,
});

export const fetchSongs = (playlist, url) => async (dispatch, getState) => {
  dispatch(fetchSongsRequest(playlist));

  const state = getState();
  const accessToken = getAccessToken(state);
  const accessTokenUriSegment = accessToken ? `&oauth_token=${accessToken}` : '';

  const { json } = await callApi(url);
  const { collection, nextHref, futureHref } = json;
  const { result, entities } = normalize(collection, [songSchema]);

  const nextUrl = nextHref ? `${nextHref}${accessTokenUriSegment}` : null;
  const futureUrl = futureHref ? `${futureHref}${accessTokenUriSegment}` : null;

  dispatch(fetchSongSuccess(playlist, result, entities, nextUrl, futureUrl));
};

export const fetchSongsIfNeeded = playlist => (dispatch, getState) => {
  const state = getState();
  const playlists = getPlaylists(state);
  const playlistExists = playlist in playlists;
  const playlistIsFetching = playlistExists ? playlists[playlist].isFetching : false;
  const playlistHasItems = playlistExists ? Boolean(playlists[playlist].items.length) : false;

  if (!playlistExists || (!playlistHasItems && !playlistIsFetching)) {
    const url = playlistUrl(playlist);
    dispatch(fetchSongs(playlist, url));
  }
};

export const fetchSongsNext = playlist => (dispatch, getState) => {
  const state = getState();
  const playlists = getPlaylists(state);
  const playlistExists = playlist in playlists;
  const playlistIsFetching = playlistExists ? playlists[playlist].isFetching : false;
  const playlistHasNextUrl = playlistExists ? Boolean(playlists[playlist].nextUrl) : false;

  if (playlistExists && !playlistIsFetching && playlistHasNextUrl) {
    const { nextUrl } = playlists[playlist];
    dispatch(fetchSongs(playlist, nextUrl));
  }
};
