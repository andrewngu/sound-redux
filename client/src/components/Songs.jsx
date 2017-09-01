import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongCards from '../components/SongCards';
import stickify from '../components/Stickify';
import Toolbar from '../components/Toolbar';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string,
  playlists: PropTypes.object.isRequired,
  sticky: PropTypes.bool,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: PropTypes.number,
  users: PropTypes.object.isRequired,
};

class Songs extends Component {
  componentWillMount() {
    const { fetchSongsIfNeeded, playlist } = this.props;
    fetchSongsIfNeeded(playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchSongsIfNeeded, playlist } = this.props;
    if (playlist !== nextProps.playlist) {
      fetchSongsIfNeeded(playlist);
    }
  }

  render() {
    const {
      authed,
      dispatch,
      fetchSongsIfNeeded,
      height,
      playingSongId,
      playlist,
      playlists,
      sticky,
      songs,
      time,
      users,
    } = this.props;

    return (
      <div className={`songs ${(sticky ? 'sticky' : '')}`}>
        <Toolbar dispatch={dispatch} playlist={playlist} sticky={sticky} time={time} />
        <div className="container">
          <SongCards
            authed={authed}
            dispatch={dispatch}
            height={height}
            playingSongId={playingSongId}
            playlist={playlist}
            playlists={playlists}
            scrollFunc={() => { fetchSongsIfNeeded(playlist); }}
            songs={songs}
            users={users}
          />
        </div>
      </div>
    );
  }
}

Songs.propTypes = propTypes;

export default stickify(Songs, 50);
