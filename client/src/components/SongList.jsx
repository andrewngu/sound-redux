import PropTypes from 'prop-types';
import React from 'react';
import SongListItem from '../components/SongListItem';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const SongList = ({ className, songs }) => (
  <div className={`song-list ${className}`}>
    {songs.map((song, i) => (
      <SongListItem
        index={i + 1}
        song={song}
      />
    ))}
  </div>
);

SongList.defaultProps = defaultProps;
SongList.propTypes = propTypes;

export default SongList;
