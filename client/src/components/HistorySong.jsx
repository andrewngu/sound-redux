import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ArtworkPlay from '../components/ArtworkPlay';
import Link from '../components/Link';
import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import getImageUrl from '../utils/ImageUtils';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

class HistorySong extends Component {
  render() {
    const { index, isActive, isPlaying, navigateTo, playlist, playSong, song } = this.props;
    const { artworkUrl, id, title, user } = song;
    const { username } = user;

    return (
      <div
        className="history__song"
        onClick={this.onClick}
        role="button"
        tabIndex="0"
      >
        <div
          className="history__song__artwork"
          style={{ backgroundImage: `url(${getImageUrl(artworkUrl)})` }}
        >
          <ArtworkPlay
            index={index}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
        <div className="history__song__main">
          <Link
            className="history__song__title"
            keys={{ id }}
            navigateTo={navigateTo}
            path={SONG_PATH}
          >
            {title}
          </Link>
          <Link
            className="history__song__username"
            keys={{ id: user.id }}
            navigateTo={navigateTo}
            path={USER_PATH}
          >
            {username}
          </Link>
        </div>
      </div>
    );
  }
}

HistorySong.propTypes = propTypes;

export default HistorySong;
