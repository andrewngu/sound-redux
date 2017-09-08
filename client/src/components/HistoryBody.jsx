import PropTypes from 'prop-types';
import React from 'react';
import HistorySong from '../components/HistorySong';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  playingSongId: PropTypes.number,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const HistoryMainBody = ({ isPlaying, playingSongId, songs }) => (
  <div className="history__body">
    {songs.map(song => (
      <HistorySong
        isActive={playingSongId === song.id}
        isPlaying={isPlaying}
        key={song.id}
        song={song}
      />
    ))}
  </div>
);

HistoryMainBody.defaultProps = defaultProps;
HistoryMainBody.propTypes = propTypes;

export default HistoryMainBody;
