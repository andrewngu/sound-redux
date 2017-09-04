import PropTypes from 'prop-types';
import React from 'react';
import SongListItem from '../components/SongListItem';

const defaultProps = {
  className: '',
  id: null,
  playingSongId: null,
};

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.number,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongList = ({
  className,
  id,
  navigateTo,
  player,
  playingSongId,
  playlist,
  playSong,
  songs,
}) => (
  <div className={`song-list ${className}`}>
    {songs.map((song, i) => (song.id !== id
      ? (
        <SongListItem
          index={i + 1}
          isActive={playingSongId === song.id}
          key={song.id}
          navigateTo={navigateTo}
          player={player}
          playlist={playlist}
          playSong={playSong}
          song={song}
        />
      ) : null
    ))}
  </div>
);

SongList.defaultProps = defaultProps;
SongList.propTypes = propTypes;

export default SongList;
