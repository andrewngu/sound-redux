import PropTypes from 'prop-types';
import React from 'react';
import NavPlaylistsItem from '../components/NavPlaylistsItem';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const NavPlaylistsPanel = ({ navigateTo, playlists }) => (
  <div className="nav-playlists__panel">
    {playlists.map(playlist => (
      <NavPlaylistsItem
        key={playlist.id}
        navigateTo={navigateTo}
        playlist={playlist}
      />
    ))}
  </div>
);

NavPlaylistsPanel.propTypes = propTypes;

export default NavPlaylistsPanel;
