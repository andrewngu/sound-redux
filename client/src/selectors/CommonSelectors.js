import { createSelector } from 'reselect';
import { TABLET_WIDTH } from '../constants/EnvironmentConstants';
import { PLAYLIST_PATH, SONGS_PATH } from '../constants/RouterConstants';

// entities selectors
export const getEntities = state => state.entities;

// environment selectors
export const getHeight = state => state.environment.height;
export const getWidth = state => state.environment.width;
export const getSidebarHeight = createSelector(
  getHeight,
  height => height - 200,
);
export const getIsMobile = createSelector(
  getWidth,
  width => width < TABLET_WIDTH,
);

// playlists selectors
export const getPlaylists = state => state.playlists;

// player selectors
export const getCurrentTime = state => state.player.currentTime;
export const getIsPlaying = state => state.player.isPlaying;
export const getPlayingIndex = state => state.player.playingIndex;
export const getPlaylist = state => state.player.playlist;
export const getPlayingSongId = createSelector(
  getPlayingIndex,
  getPlaylist,
  getPlaylists,
  (playingIndex, playlist, playlists) => {
    if (playlist && playingIndex !== null) {
      return playlists[playlist].items[playingIndex];
    }

    return null;
  },
);
export const getRepeat = state => state.player.repeat;
export const getShuffle = state => state.player.shuffle;

// router selectors
export const getGenre = state => (state.router.route.options.q
  ? ''
  : (state.router.route.options.g || 'house')
);
export const getId = state => (state.router.route.keys.id ? Number(state.router.route.keys.id) : 0);
export const getPath = state => state.router.route.path;
export const getSearch = state => state.router.route.options.q || '';
export const getSession = (state) => {
  const { s } = state.router.route.options;
  if (s === 'likes' || s === 'stream') {
    return s;
  }

  return '';
};
export const getShowLikes = createSelector(
  getPath,
  getSession,
  (path, session) => path === SONGS_PATH && session === 'likes',
);
export const getShowPlaylist = createSelector(
  getPath,
  path => path === PLAYLIST_PATH,
);
export const getShowStream = createSelector(
  getPath,
  getSession,
  (path, session) => path === SONGS_PATH && session === 'stream',
);
export const getTime = state => state.router.route.options.t || '';

// session selectors
export const getLikes = state => state.session.likes;
export const getNewStreamSongs = state => state.session.newStreamSongs;
export const getOauthToken = state => state.session.oauthToken;
export const getSessionId = state => state.session.id;
export const getSessionUser = createSelector(
  getSessionId,
  getEntities,
  (id, entities) => (id in entities.users
    ? entities.users[id]
    : null
  ),
);
export const getIsAuthenticated = createSelector(
  getOauthToken,
  getSessionUser,
  (oauthToken, user) => Boolean(oauthToken && user),
);
export const getSessionFollowings = state => state.session.followings;
