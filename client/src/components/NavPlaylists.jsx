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
  showPlaylist: PropTypes.bool.isRequired,
};

const NavPlaylists = ({ navigateTo, playlist, playlists, showPlaylist }) => (
  <Popover className="nav-playlists">
    <div className={`nav-session__item ${showPlaylist ? 'nav-session__item--active' : ''}`}>
      <div className="nav-session__item__text">
        {playlist ? playlist.title : 'Playlists'}
      </div>
      <i className="nav-session__item__icon ion-ios-arrow-down" />
    </div>
    <NavPlaylistsPanel
      navigateTo={navigateTo}
      playlists={playlists}
      showPlaylist={showPlaylist}
    />
  </Popover>
);

NavPlaylists.defaultProps = defaultProps;
NavPlaylists.propTypes = propTypes;

export default NavPlaylists;
