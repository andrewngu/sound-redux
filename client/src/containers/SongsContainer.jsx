import React from 'react';
import { connect } from 'react-redux';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import { fetchSongsIfNeeded, fetchSongsNext } from '../actions/PlaylistActions';
import { login, toggleLike } from '../actions/SessionActions';
import Songs from '../components/Songs';
import { GENRES, TIMES } from '../constants/PlaylistConstants';
import {
  getGenre,
  getIsAuthenticated,
  getIsMobile,
  getIsPlaying,
  getLikes,
  getPlayingSongId,
  getSearch,
  getShowLikes,
  getShowPlaylist,
  getShowStream,
  getTime,
} from '../selectors/CommonSelectors';
import getPlaylistData from '../selectors/SongsSelectors';

const SongsContainer = props => <Songs {...props} />;

const mapStateToProps = (state) => {
  const { environment } = state;
  const { height } = environment;

  return {
    ...getPlaylistData(state),
    height,
    isAuthenticated: getIsAuthenticated(state),
    isMobile: getIsMobile(state),
    isPlaying: getIsPlaying(state),
    likes: getLikes(state),
    playingSongId: getPlayingSongId(state),
    showLikes: getShowLikes(state),
    showPlaylist: getShowPlaylist(state),
    showStream: getShowStream(state),
    genre: getGenre(state),
    genres: GENRES,
    search: getSearch(state),
    time: getTime(state),
    times: TIMES,
  };
};

export default connect(mapStateToProps, {
  fetchSongsIfNeeded,
  fetchSongsNext,
  login,
  navigateTo,
  playSong,
  toggleLike,
})(SongsContainer);
