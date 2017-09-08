import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HistoryHeader from '../components/HistoryHeader';
import HistoryBody from '../components/HistoryBody';

const propTypes = {
  showHistory: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleShowHistory: PropTypes.func.isRequired,
};

class History extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { toggleShowHistory } = this.props;
    toggleShowHistory();
  }

  render() {
    const { showHistory, songs } = this.props;
    if (!showHistory) {
      return null;
    }

    return (
      <div className="history">
        <div
          className="history__bg"
          onClick={this.onClick}
          role="button"
          tabIndex="0"
        />
        <div className="history__main">
          <HistoryHeader />
          <HistoryBody songs={songs} />
        </div>
      </div>
    );
  }
}

History.propTypes = propTypes;

export default History;
