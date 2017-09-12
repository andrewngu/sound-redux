import PropTypes from 'prop-types';
import React from 'react';
import NavPlaylistsItem from '../components/NavPlaylistsItem';
import Popover from '../components/Popover';

const defaultProps = {
  navPlaylist: null,
};

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  navPlaylist: PropTypes.shape({}),
  navPlaylists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showPlaylist: PropTypes.bool.isRequired,
};

const NavPlaylists = ({ navigateTo, navPlaylist, navPlaylists, showPlaylist }) => (
  <Popover className="nav-playlists">
    <div className={`nav-session__item ${showPlaylist ? 'nav-session__item--active' : ''}`}>
      <div className="nav-session__item__text">
        {navPlaylist ? navPlaylist.title : 'Playlists'}
      </div>
      <i className="nav-session__item__icon ion-ios-arrow-down" />
    </div>
    <div className="nav-playlists__panel">
      {navPlaylists.map(playlist => (
        <NavPlaylistsItem
          key={playlist.id}
          navigateTo={navigateTo}
          playlist={playlist}
        />
      ))}
    </div>
  </Popover>
);

NavPlaylists.defaultProps = defaultProps;
NavPlaylists.propTypes = propTypes;

export default NavPlaylists;
