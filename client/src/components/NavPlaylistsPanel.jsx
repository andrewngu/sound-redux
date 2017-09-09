import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { PLAYLIST_PATH } from '../constants/RouterConstants';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showPlaylist: PropTypes.bool.isRequired,
};

const NavPlaylistsPanel = ({ navigateTo, playlists, showPlaylist }) => (
  <div className="nav-playlists__panel">
    {playlists.map(playlist => (
      <Link
        className={`nav-playlists__item ${showPlaylist ? 'nav-playlists__item--active' : ''}`}
        key={playlist.id}
        keys={{ id: playlist.id }}
        navigateTo={navigateTo}
        path={PLAYLIST_PATH}
      >
        <div className="nav-playlists__item__main">
          <div className="nav-playlists__item__title">
            {playlist.title}
          </div>
          <div className="nav-playlists__item__meta">
            {`${playlist.tracks.length} Songs`}
          </div>
        </div>
        <div className="nav-playlists__item__songs">
          {playlist.tracks.slice(0, 5).map(song => (
            <div
              className="nav-playlists__item__song"
              key={song.id}
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
