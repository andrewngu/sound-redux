import React from 'react';
import { connect } from 'react-redux';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import { fetchSongsIfNeeded, fetchSongsNext } from '../actions/PlaylistActions';
import Songs from '../components/Songs';
import { GENRES, TIMES } from '../constants/PlaylistConstants';
import { getGenre, getIsPlaying, getLikes, getPlayingSongId, getSearch, getShowLikes, getShowStream, getTime } from '../selectors/CommonSelectors';
import { getIsFetching, getPlaylist, getSongs } from '../selectors/SongsSelectors';

const SongsContainer = props => <Songs {...props} />;

const mapStateToProps = (state) => {
  const { authed, environment } = state;
  const { height } = environment;

  return {
    authed,
    height,
    isFetching: getIsFetching(state),
    isPlaying: getIsPlaying(state),
    likes: getLikes(state),
    playingSongId: getPlayingSongId(state),
    playlist: getPlaylist(state),
    showLikes: getShowLikes(state),
    showStream: getShowStream(state),
    songs: getSongs(state),
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
})(SongsContainer);
