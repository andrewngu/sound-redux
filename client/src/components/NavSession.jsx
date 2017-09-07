import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  showLikes: PropTypes.bool.isRequired,
  showStream: PropTypes.bool.isRequired,
};

const NavSession = ({ isAuthenticated, navigateTo, showLikes, showStream }) => {
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
    </div>
  );
};

NavSession.propTypes = propTypes;

export default NavSession;
