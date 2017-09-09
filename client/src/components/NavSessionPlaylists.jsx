import PropTypes from 'prop-types';
import React from 'react';
import NavSessionPlaylistsPanel from '../components/NavSessionPlaylistsPanel';
import Popover from '../components/Popover';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  playlist: PropTypes.shape({}).isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const NavSessionPlaylists = ({ className, playlist, playlists }) => (
  <Popover className={`nav-session-playlists ${className}`}>
    <div className="nav-session-playlists__title">
      {playlist ? playlist.title : 'Playlists'}
    </div>
    <NavSessionPlaylistsPanel
      playlists={playlists}
    />
  </Popover>
);

NavSessionPlaylists.defaultProps = defaultProps;
NavSessionPlaylists.propTypes = propTypes;

export default NavSessionPlaylists;
