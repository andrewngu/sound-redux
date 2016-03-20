import React, { Component, PropTypes } from 'react';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import MobileSongList from '../components/MobileSongList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

class MobileMe extends Component {
  getPlaylist() {
    const { route } = this.props;
    const { path } = route;

    if (path[1].indexOf('PLAYLIST:') >= 0) {
      return path[1].slice(10);
    }

    switch (path[1]) {
      case 'stream':
        return 'stream';
      case 'likes':
        return 'likes';
      default:
        return 'stream';
    }
  }


  render() {
    const { dispatch, playlists, songs, users, playingSongId } = this.props;
    const playlist = this.getPlaylist() + AUTHED_PLAYLIST_SUFFIX;
    return (
      <MobileSongList
        dispatch={dispatch}
        playingSongId={playingSongId}
        playlist={playlist}
        playlists={playlists}
        songs={songs}
        users={users}
      />
    );
  }
}

MobileMe.propTypes = propTypes;

export default MobileMe;
