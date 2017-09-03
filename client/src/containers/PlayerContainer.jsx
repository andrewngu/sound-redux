import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playNextSong,
  playPrevSong,
  playSong,
  toggleRepeat,
  toggleShuffle,
} from '../actions/PlayerActions';
import Player from '../components/Player';
import { getPlayingSongId, getPlaylists } from '../selectors/CommonSelectors';
import { getNextIndex, getSong } from '../selectors/PlayerSelectors';

const defaultProps = {
  song: null,
};

const propTypes = {
  song: PropTypes.shape({}),
};

const PlayerContainer = (props) => {
  const { song } = props;
  return song ? <Player {...props} /> : null;
};

PlayerContainer.defaultProps = defaultProps;
PlayerContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { entities, player } = state;
  const { songs, users } = entities;

  return {
    nextIndex: getNextIndex(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlists: getPlaylists(state),
    song: getSong(state),
    songs,
    users,
  };
};

export default connect(mapStateToProps, {
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playNextSong,
  playPrevSong,
  playSong,
  toggleRepeat,
  toggleShuffle,
})(PlayerContainer);
