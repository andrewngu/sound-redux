import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const NavSessionPlaylistsPanel = ({ navigateTo, playlists }) => (
  <div className="nav-session-playlists__panel">
    {playlists.map(playlist => (
      <Link
        className="nav-session-playlists__panel__playlist"
        keys={{ id: playlist.id }}
        navigateTo={navigateTo}
        path={PLAYLIST_PATH}
      >
        <div className="nav-session-playlists__panel__playlist__title">
          {playlist.title}
        </div>
        <div className="nav-session-playlists__panel__playlist__songs">
          {playlist.tracks.map(song => (
            <div
              className="nav-session-playlists__panel__playlist__song"
              style={{ backgroundImage: `url(${getImageUrl(song.artworkUrl)})` }}
            />
          ))}
        </div>
      </Link>
    ))}
  </div>
);

NavSessionPlaylistsPanel.propTypes = propTypes;

export default NavSessionPlaylistsPanel;
