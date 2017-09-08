import React from 'react';
import { connect } from 'react-redux';
import toggleShowHistory from '../actions/HistoryActions';
import History from '../components/History';
import { getIsPlaying, getPlayingSongId } from '../selectors/CommonSelectors';
import { getShowHistory, getSongs } from '../selectors/HistorySelectors';

const HistoryContainer = props => <History {...props} />;

const mapStateToProps = state => ({
  isPlaying: getIsPlaying(state),
  playingSongId: getPlayingSongId(state),
  showHistory: getShowHistory(state),
  songs: getSongs(state),
});

export default connect(mapStateToProps, {
  toggleShowHistory,
})(HistoryContainer);
