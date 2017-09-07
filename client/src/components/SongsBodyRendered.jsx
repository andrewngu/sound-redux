import PropTypes from 'prop-types';
import React from 'react';
import SongsBodyCard from '../components/SongsBodyCard';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  end: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  navigateTo: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  start: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

const SongsBodyRendered = ({
  authed,
  end,
  isAuthenticated,
  isPlaying,
  likes,
  navigateTo,
  playingSongId,
  playlist,
  playSong,
  songs,
  start,
  toggleLike,
}) => {
  const cellsPerRow = 5;
  const length = songs.length;
  const rows = [];

  for (let i = start; i < end; i += cellsPerRow) {
    const row = [];

    for (let j = 0; j < cellsPerRow; j += 1) {
      const index = i + j;
      const song = index < length ? songs[index] : null;

      row.push(
        <div className="row__cell" key={index}>
          {song ? (
            <SongsBodyCard
              authed={authed}
              index={index}
              isActive={playingSongId === song.id}
              isAuthenticated={isAuthenticated}
              isPlaying={isPlaying}
              liked={Boolean(song.id in likes && likes[song.id])}
              navigateTo={navigateTo}
              playlist={playlist}
              playSong={playSong}
              song={song}
              toggleLike={toggleLike}
            />
          ) : null}
        </div>,
      );
    }

    rows.push(
      <div className="row" key={i}>
        {row}
      </div>,
    );
  }

  return <div>{rows}</div>;
};

SongsBodyRendered.defaultProps = defaultProps;
SongsBodyRendered.propTypes = propTypes;

export default SongsBodyRendered;
