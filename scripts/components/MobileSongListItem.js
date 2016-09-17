import React, { Component, PropTypes } from 'react';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  isActive: PropTypes.bool.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

class MobileSongListItem extends Component {
  render() {
    const { isActive, playSong, song, user } = this.props;

    return (
      <a
        className={`mobile-song-list-item ${(isActive ? ' active' : '')}`}
        href="#"
        onClick={playSong}
      >
        <img
          alt="song artwork"
          className="mobile-song-list-item-image"
          src={getImageUrl(song.artwork_url)}
        />
        <div className="mobile-song-list-item-info">
          <div className="mobile-song-list-item-title">
            {song.title}
          </div>
          <div className="mobile-song-list-item-user">
            {user.username}
          </div>
        </div>
      </a>
    );
  }
}

MobileSongListItem.propTypes = propTypes;

export default MobileSongListItem;
