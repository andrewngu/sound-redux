import React from 'react';
import { connect } from 'react-redux';
import { navigateTo } from '../actions/RouterActions';
import fetchSongIfNeeded from '../actions/SongActions';
import Song from '../components/Song';
import { getId, getPlayingSongId, getSidebarHeight } from '../selectors/CommonSelectors';
import { getPlaylist, getSong, getTimed } from '../selectors/SongSelectors';

const SongContainer = props => <Song {...props} />;

const mapStateToProps = (state) => {
  const { authed, entities, player, playlists } = state;
  const { songs, users } = entities;

  return {
    authed,
    id: getId(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlist: getPlaylist(state),
    playlists,
    sidebarHeight: getSidebarHeight(state),
    song: getSong(state),
    songs,
    timed: getTimed(state),
    users,
  };
};

export default connect(mapStateToProps, {
  fetchSongIfNeeded,
  navigateTo,
})(SongContainer);
