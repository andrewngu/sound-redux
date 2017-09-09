import PropTypes from 'prop-types';
import React from 'react';
import NavPlaylistsPanel from '../components/NavPlaylistsPanel';
import Popover from '../components/Popover';

const defaultProps = {
  playlist: null,
};

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.shape({}),
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const NavPlaylists = ({ navigateTo, playlist, playlists }) => (
  <Popover className="nav-playlists">
    <div className="nav-playlists__title">
      <div className="nav-playlists__title__text">
        {playlist ? playlist.title : 'Playlists'}
      </div>
      <i className="nav-playlists__title__icon ion-ios-arrow-down" />
    </div>
    <NavPlaylistsPanel
      navigateTo={navigateTo}
      playlists={playlists}
    />
  </Popover>
);

NavPlaylists.defaultProps = defaultProps;
NavPlaylists.propTypes = propTypes;

export default NavPlaylists;
