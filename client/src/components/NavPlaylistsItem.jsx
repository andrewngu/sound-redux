import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import getImageUrl from '../utils/ImageUtils';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.shape({}).isRequired,
};

const NavPlaylistsItem = ({ navigateTo, playlist }) => {
  const { id, title, tracks } = playlist;

  return (
    <Link
      className="nav-playlists__item"
      key={id}
      keys={{ id }}
      navigateTo={navigateTo}
      path={PLAYLIST_PATH}
    >
      <div className="nav-playlists__item__main">
        <div className="nav-playlists__item__title">
          {title}
        </div>
        <div className="nav-playlists__item__meta">
          {`${tracks.length} Song${tracks.length === 1 ? '' : 's'}`}
        </div>
      </div>
      <div className="nav-playlists__item__songs">
        {tracks.slice(0, 5).map(song => (
          <div
            className="nav-playlists__item__song"
            key={song.id}
            style={{ backgroundImage: `url(${getImageUrl(song.artworkUrl)})` }}
          />
        ))}
      </div>
    </Link>
  );
};

NavPlaylistsItem.propTypes = propTypes;

export default NavPlaylistsItem;
