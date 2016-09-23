import React, { Component, PropTypes } from 'react';
import { fetchSongsIfNeeded } from '../actions/PlaylistsActions';
import MobileSongList from '../components/MobileSongList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class MobileSongs extends Component {
  componentWillMount() {
    const { dispatch, playlist, playlists } = this.props;
    if (!(playlist in playlists) || playlists[playlist].items.length === 0) {
      dispatch(fetchSongsIfNeeded(playlist));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, playlist, playlists } = this.props;
    if (playlist !== nextProps.playlist) {
      if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
        dispatch(fetchSongsIfNeeded(nextProps.playlist));
      }
    }
  }

  render() {
    const { dispatch, playingSongId, playlist, playlists, songs, users } = this.props;

    return (
      <MobileSongList
        playlist={playlist}
        playlists={playlists}
        songs={songs}
        users={users}
        playingSongId={playingSongId}
        dispatch={dispatch}
      />
    );
  }
}

MobileSongs.propTypes = propTypes;

export default MobileSongs;
