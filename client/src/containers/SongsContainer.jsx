import React from 'react';
import { connect } from 'react-redux';
import { fetchSongsIfNeeded } from '../actions/PlaylistActions';
import Songs from '../components/Songs';
import { getPlayingSongId, getTime } from '../selectors/CommonSelectors';
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
    time: getTime(state),
  };
};

export default connect(mapStateToProps, {
  fetchSongsIfNeeded,
})(SongsContainer);
