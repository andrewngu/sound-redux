import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import NavPlaylists from '../components/NavPlaylists';
import { SONGS_PATH } from '../constants/RouterConstants';

const defaultProps = {
  playlist: null,
};

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playlist: PropTypes.shape({}),
  playlists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showLikes: PropTypes.bool.isRequired,
  showStream: PropTypes.bool.isRequired,
};

const NavSession = ({
  isAuthenticated,
  navigateTo,
  playlist,
  playlists,
  showLikes,
  showStream,
}) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="nav-session">
      <Link
        className={`nav-session__item ${showStream ? 'nav-session__item--active' : ''}`}
        navigateTo={navigateTo}
        path={SONGS_PATH}
        options={{ s: 'stream' }}
      >
        Stream
      </Link>
      <Link
        className={`nav-session__item ${showLikes ? 'nav-session__item--active' : ''}`}
        navigateTo={navigateTo}
        path={SONGS_PATH}
        options={{ s: 'likes' }}
      >
        Likes
      </Link>
      <NavPlaylists
        navigateTo={navigateTo}
        playlist={playlist}
        playlists={playlists}
      />
    </div>
  );
};

NavSession.defaultProps = defaultProps;
NavSession.propTypes = propTypes;

export default NavSession;
