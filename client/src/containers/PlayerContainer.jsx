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
  playNextSongFromButton,
  playPrevSong,
  playSong,
  toggleRepeat,
  toggleShuffle,
} from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import toggleShowHistory from '../actions/HistoryActions';
import Player from '../components/Player';
import { getPlayingSongId, getPlaylists } from '../selectors/CommonSelectors';
import { getAudioUrl, getNextIndex, getSong } from '../selectors/PlayerSelectors';
import { getShowHistory } from '../selectors/HistorySelectors';

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
    audioUrl: getAudioUrl(state),
    nextIndex: getNextIndex(state),
    player,
    playingSongId: getPlayingSongId(state),
    playlists: getPlaylists(state),
    showHistory: getShowHistory(state),
    song: getSong(state),
    songs,
    users,
  };
};

export default connect(mapStateToProps, {
  navigateTo,
  onLoadedMetadata,
  onLoadStart,
  onPause,
  onPlay,
  onTimeUpdate,
  onVolumeChange,
  playNextSong,
  playNextSongFromButton,
  playPrevSong,
  playSong,
  toggleRepeat,
  toggleShowHistory,
  toggleShuffle,
})(PlayerContainer);
