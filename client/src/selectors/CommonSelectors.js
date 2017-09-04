import { createSelector } from 'reselect';

// authed selectors
export const getAccessToken = state => state.authed.accessToken;
export const getLikes = state => state.authed.likes;

// entities selectors
export const getEntities = state => state.entities;

// environment selectors
export const getHeight = state => state.environment.height;
export const getSidebarHeight = createSelector(
  getHeight,
  height => height - 220,
);

// playlists selectors
export const getPlaylists = state => state.playlists;

// player selectors
export const getIsPlaying = state => state.player.isPlaying;
export const getPlaylistHistory = state => state.player.playlistHistory;
export const getPlayingIndex = state => state.player.playingIndex;
export const getPlayingSongId = createSelector(
  getPlaylistHistory,
  getPlayingIndex,
  getPlaylists,
  (playlistHistory, playingIndex, playlists) => {
    if (playingIndex !== null && playlistHistory.length) {
      return playlists[playlistHistory[playlistHistory.length - 1]].items[playingIndex];
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
export const getSearch = state => state.router.route.options.q || '';
export const getTime = state => state.router.route.options.t || '';
