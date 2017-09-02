import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  loadedMetadata,
  loadStart,
  pause,
  play,
  playSong,
  timeUpdate,
  volumeChange,
} from '../actions/PlayerActions';
import Player from '../components/Player';
import { getPlayingSongId, getPlaylists } from '../selectors/CommonSelectors';
import getSong from '../selectors/PlayerSelectors';

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
    player,
    playingSongId: getPlayingSongId(state),
    playlists: getPlaylists(state),
    song: getSong(state),
    songs,
    users,
  };
};

export default connect(mapStateToProps, {
  loadedMetadata,
  loadStart,
  pause,
  play,
  playSong,
  timeUpdate,
  volumeChange,
})(PlayerContainer);
