import React from 'react';
import { connect } from 'react-redux';
import toggleShowHistory from '../actions/HistoryActions';
import { playSong } from '../actions/PlayerActions';
import { navigateTo } from '../actions/RouterActions';
import History from '../components/History';
import { HISTORY_PLAYLIST } from '../constants/PlaylistConstants';
import { getIsPlaying, getPlayingSongId } from '../selectors/CommonSelectors';
import { getShowHistory, getSongs } from '../selectors/HistorySelectors';

const HistoryContainer = props => <History {...props} />;

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state),
  playingSongId: getPlayingSongId(state),
  playlist: HISTORY_PLAYLIST,
  showHistory: getShowHistory(state),
  songs: getSongs(state),
});

export default connect(mapStateToProps, {
  navigateTo,
  playSong,
  toggleShowHistory,
})(HistoryContainer);
