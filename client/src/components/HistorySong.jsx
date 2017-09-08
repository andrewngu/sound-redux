import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  index: PropTypes.number.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

class HistoryMainBodySong extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { playlist, playSong, index } = this.props;
    playSong(playlist, index);
  }

  render() {
    const { song } = this.props;
    const { artwork } = song;

    return (
      <div
        className="history__song"
        onClick={this.onClick}
        role="button"
        tabIndex="0"
      >
        <div
          className="history__song__artwork"
          style={{ backgroundImage: `url(${getImageUrl(artwork)})` }}
        />
      </div>
    );
  }
}

HistoryMainBodySong.propTypes = propTypes;

export default HistoryMainBodySong;
