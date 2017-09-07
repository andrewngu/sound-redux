import React from 'react';
import { connect } from 'react-redux';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import { fetchSongsIfNeeded, fetchSongsNext } from '../actions/PlaylistActions';
import { toggleLike } from '../actions/SessionActions';
import Songs from '../components/Songs';
import { GENRES, TIMES } from '../constants/PlaylistConstants';
import { getGenre, getIsAuthenticated, getIsPlaying, getLikes, getPlayingSongId, getSearch, getShowLikes, getShowStream, getTime } from '../selectors/CommonSelectors';
import getPlaylistData from '../selectors/SongsSelectors';

const SongsContainer = props => <Songs {...props} />;

const mapStateToProps = (state) => {
  const { authed, environment } = state;
  const { height } = environment;

  return {
    ...getPlaylistData(state),
    authed,
    height,
    isAuthenticated: getIsAuthenticated(state),
    isPlaying: getIsPlaying(state),
    likes: getLikes(state),
    playingSongId: getPlayingSongId(state),
    showLikes: getShowLikes(state),
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
  navigateTo,
  playSong,
  toggleLike,
})(SongsContainer);
