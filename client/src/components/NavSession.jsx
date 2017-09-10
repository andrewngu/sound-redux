import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import NavPlaylists from '../components/NavPlaylists';
import NavStream from '../components/NavStream';
import { SONGS_PATH } from '../constants/RouterConstants';

const defaultProps = {
  navPlaylist: null,
};

const propTypes = {
  fetchNewStreamSongs: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadNewStreamSongs: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  navPlaylist: PropTypes.shape({}),
  navPlaylists: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newStreamSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
  showLikes: PropTypes.bool.isRequired,
  showPlaylist: PropTypes.bool.isRequired,
  showStream: PropTypes.bool.isRequired,
  streamFutureUrl: PropTypes.string.isRequired,
};

const NavSession = ({
  fetchNewStreamSongs,
  isAuthenticated,
  loadNewStreamSongs,
  navigateTo,
  navPlaylist,
  navPlaylists,
  newStreamSongs,
  showLikes,
  showPlaylist,
  showStream,
  streamFutureUrl,
}) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="nav-session">
      <NavStream
        fetchNewStreamSongs={fetchNewStreamSongs}
        loadNewStreamSongs={loadNewStreamSongs}
        navigateTo={navigateTo}
        newStreamSongs={newStreamSongs}
        showStream={showStream}
        streamFutureUrl={streamFutureUrl}
      />
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
        navPlaylist={navPlaylist}
        navPlaylists={navPlaylists}
        showPlaylist={showPlaylist}
      />
    </div>
  );
};

NavSession.defaultProps = defaultProps;
NavSession.propTypes = propTypes;

export default NavSession;
