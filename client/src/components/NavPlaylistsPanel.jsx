import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const NavPlaylistsPanel = ({ navigateTo, playlists }) => (
  <div className="nav-playlists__panel">
    {playlists.map(playlist => (
      <Link
        className="nav-playlists__playlist"
        keys={{ id: playlist.id }}
        navigateTo={navigateTo}
        path={PLAYLIST_PATH}
      >
        <div className="nav-playlists__playlist__main">
          <div className="nav-playlists__playlist__title">
            {playlist.title}
          </div>
          <div className="nav-playlists__playlist__meta">
            {`${playlist.tracks.length} Songs`}
          </div>
        </div>
        <div className="nav-playlists__playlist__songs">
          {playlist.tracks.slice(0, 5).map(song => (
            <div
              className="nav-playlists__playlist__song"
              style={{ backgroundImage: `url(${getImageUrl(song.artworkUrl)})` }}
            />
          ))}
        </div>
      </Link>
    ))}
  </div>
);

NavPlaylistsPanel.propTypes = propTypes;

export default NavPlaylistsPanel;
