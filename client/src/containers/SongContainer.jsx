import React from 'react';
import { connect } from 'react-redux';
import { fetchSongIfNeeded } from '../actions/SongsActions';
import Song from '../components/Song';
import { getId, getPlayingSongId } from '../selectors/CommonSelectors';
import getSong from '../selectors/SongSelectors';

const SongContainer = props => <Song {...props} />;

const mapStateToProps = (state) => {
  const { authed, entities, environment, player, playlists } = state;
  const { songs, users } = entities;
  const { height } = environment;

  return {
    authed,
    height,
    id: getId(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlists,
    song: getSong(state),
    songs,
    users,
  };
};

export default connect(mapStateToProps, {
  fetchSongIfNeeded,
})(SongContainer);
