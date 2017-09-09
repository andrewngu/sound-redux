import Cookies from 'js-cookie';
import { normalize } from 'normalizr';
import { fetchSongsRequest, fetchSongsIfNeeded, fetchSongsSuccess } from '../actions/PlaylistActions';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID, SESSION_FOLLOWINGS_URL, SESSION_LIKES_URL, SESSION_STREAM_URL, SESSION_USER_URL, TOGGLE_FOLLOW_URL, TOGGLE_LIKE_URL } from '../constants/ApiConstants';
import { SESSION_LIKES_PLAYLIST, SESSION_STREAM_PLAYLIST } from '../constants/PlaylistConstants';
import { songSchema, userSchema } from '../constants/Schemas';
import { getOauthToken } from '../selectors/CommonSelectors';
import { callApi, loginToSoundCloud } from '../utils/ApiUtils';

const COOKIE_PATH = 'oauthToken';

const fetchSessionFollowingsSuccess = (followings, entities) => ({
  type: types.FETCH_SESSION_FOLLOWINGS_SUCCESS,
  entities,
  followings,
});

const fetchSessionFollowings = oauthToken => async (dispatch) => {
  const { json } = await callApi(`${SESSION_FOLLOWINGS_URL}?oauth_token=${oauthToken}`);
  const { collection } = json;
  const { result, entities } = normalize(collection, [userSchema]);
  const followings = result.reduce((obj, id) => ({
    ...obj,
    [id]: 1,
  }), {});

  dispatch(fetchSessionFollowingsSuccess(followings, entities));
};

const fetchSessionLikesSuccess = likes => ({
  type: types.FETCH_SESSION_LIKES_SUCCESS,
  likes,
});

const fetchSessionLikes = oauthToken => async (dispatch) => {
  dispatch(fetchSongsRequest(SESSION_LIKES_PLAYLIST));

  const { json } = await callApi(`${SESSION_LIKES_URL}?oauth_token=${oauthToken}`);
  const songs = json.filter(song => song.streamable);
  const { result, entities } = normalize(songs, [songSchema]);

  const likes = result.reduce((obj, id) => ({ ...obj, [id]: 1 }), {});

  dispatch(fetchSessionLikesSuccess(likes));
  dispatch(fetchSongsSuccess(SESSION_LIKES_PLAYLIST, result, entities, null, null));
};

const fetchSessionUserSuccess = (id, entities) => ({
  type: types.FETCH_SESSION_USER_SUCCESS,
  id,
  entities,
});

const fetchSessionUser = oauthToken => async (dispatch) => {
  const { json } = await callApi(`${SESSION_USER_URL}?oauth_token=${oauthToken}`);
  const { result, entities } = normalize(json, userSchema);

  dispatch(fetchSessionUserSuccess(result, entities));
};

const fetchSessionData = oauthToken => (dispatch) => {
  dispatch(fetchSessionUser(oauthToken));
  dispatch(fetchSessionFollowings(oauthToken));
  dispatch(fetchSessionLikes(oauthToken));
  dispatch(fetchSongsIfNeeded(SESSION_STREAM_PLAYLIST, `${SESSION_STREAM_URL}&oauth_token=${oauthToken}`));
};

const loginSuccess = oauthToken => ({
  type: types.LOGIN_SUCCESS,
  oauthToken,
});

export const login = () => async (dispatch) => {
  const { json } = await loginToSoundCloud(CLIENT_ID);
  const { oauthToken } = json;
  Cookies.set(COOKIE_PATH, oauthToken);

  dispatch(loginSuccess(oauthToken));
  dispatch(fetchSessionData(oauthToken));
};

export const logout = () => (dispatch) => {
  Cookies.remove(COOKIE_PATH);
  dispatch({ type: types.LOGOUT });
};

export const initAuth = () => (dispatch) => {
  const oauthToken = Cookies.get(COOKIE_PATH);
  if (oauthToken) {
    dispatch(loginSuccess(oauthToken));
    dispatch(fetchSessionData(oauthToken));
  }
};

export const toggleFollowError = (id, following) => ({
  type: types.TOGGLE_FOLLOW,
  id,
  following,
});

export const toggleFollowRequest = (id, following) => ({
  type: types.TOGGLE_FOLLOW,
  id,
  following,
});

export const toggleFollow = (id, following) => async (dispatch, getState) => {
  dispatch(toggleFollowRequest(id, following));

  const oauthToken = getOauthToken(getState());
  const { error } = await callApi(
    `${TOGGLE_FOLLOW_URL.replace(':id', id)}?oauth_token=${oauthToken}`,
    { method: following ? 'PUT' : 'DELETE' },
  );

  if (error) {
    dispatch(toggleFollowError(id, !following));
  }
};

export const toggleLikeError = (id, liked) => ({
  type: types.TOGGLE_LIKE,
  id,
  liked,
});

export const toggleLikeRequest = (id, liked) => ({
  type: types.TOGGLE_LIKE,
  id,
  liked,
});

export const toggleLikeSuccess = (id, liked) => ({
  type: types.TOGGLE_LIKE_SUCCESS,
  id,
  liked,
});

export const toggleLike = (id, liked) => async (dispatch, getState) => {
  dispatch(toggleLikeRequest(id, liked));

  const oauthToken = getOauthToken(getState());
  const { error } = await callApi(
    `${TOGGLE_LIKE_URL.replace(':id', id)}?oauth_token=${oauthToken}`,
    { method: liked ? 'PUT' : 'DELETE' },
  );

  if (error) {
    return dispatch(toggleLikeError(id, !liked));
  }

  return dispatch(toggleLikeSuccess(id, liked));
};
