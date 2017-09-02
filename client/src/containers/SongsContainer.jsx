import React from 'react';
import { connect } from 'react-redux';
import { playSong } from '../actions/PlayerActions';
import { fetchSongsIfNeeded } from '../actions/PlaylistActions';
import Songs from '../components/Songs';
import { GENRES, TIMES } from '../constants/PlaylistConstants';
import { getPlayingSongId, getGenre, getTime } from '../selectors/CommonSelectors';
import { getIsFetching, getPlaylist, getSongs } from '../selectors/SongsSelectors';

const SongsContainer = props => <Songs {...props} />;

const mapStateToProps = (state) => {
  const { authed, environment } = state;
  const { height } = environment;

  return {
    authed,
    height,
    isFetching: getIsFetching(state),
    playingSongId: getPlayingSongId(state),
    playlist: getPlaylist(state),
    songs: getSongs(state),
    genre: getGenre(state),
    genres: GENRES,
    time: getTime(state),
    times: TIMES,
  };
};

export default connect(mapStateToProps, {
  fetchSongsIfNeeded,
  playSong,
})(SongsContainer);
