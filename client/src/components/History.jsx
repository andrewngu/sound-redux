import PropTypes from 'prop-types';
import React from 'react';
import HistorySong from '../components/HistorySong';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  playlist: PropTypes.string.isRequired,
  playingSongId: PropTypes.number,
  playSong: PropTypes.func.isRequired,
  showHistory: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleShowHistory: PropTypes.func.isRequired,
};

const History = ({
  isPlaying,
  playingSongId,
  playlist,
  playSong,
  showHistory,
  songs,
  toggleShowHistory,
}) => {
  if (!showHistory) {
    return null;
  }

  return (
    <div className="history">
      <div
        className="history__bg"
        onClick={toggleShowHistory}
        role="button"
        tabIndex="0"
      />
      <div className="history__main">
        <div className="history__header">
          <div className="history__header__title">
            History
          </div>
          <div
            className="history__header__button"
            onClick={toggleShowHistory}
            role="button"
            tabIndex="0"
          >
            <i className="history__header__button__icon ion-close" />
          </div>
        </div>
        <div className="history__body">
          {songs.map((song, i) => (
            <HistorySong
              index={i}
              isActive={playingSongId === song.id}
              isPlaying={isPlaying}
              key={song.id}
              playlist={playlist}
              playSong={playSong}
              song={song}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

History.defaultProps = defaultProps;
History.propTypes = propTypes;

export default History;
