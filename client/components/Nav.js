import React, { Component, PropTypes } from 'react';
import { loginUser, logoutUser } from '../actions/AuthedActions';
import Link from '../components/Link';
import NavSearch from '../components/NavSearch';
import Popover from '../components/Popover';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.object.isRequired,
  authedPlaylists: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  getPlaylist() {
    const { authedPlaylists, navigator } = this.props;
    const { path } = navigator.route;

    if (path[0] === 'me'
    && path[1] === 'playlists'
    && path[2] in authedPlaylists) {
      return authedPlaylists[path[2]].title;
    }

    return 'playlists';
  }

  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginUser());
  }

  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  renderArtworks(playlist) {
    const { songs } = this.props;
    return playlist.tracks.slice(0, 10).map(songId =>
      <img
        alt="song artwork"
        className="nav-playlist-image"
        key={songId}
        src={getImageUrl(songs[songId].artwork_url)}
      />
    );
  }

  renderNavUser() {
    const { authed } = this.props;

    if (authed.user) {
      return (
        <Popover className="nav-user">
          <div className="nav-user-link">
            <img
              alt="user avatar"
              className="nav-authed-image"
              src={getImageUrl(authed.user.avatar_url)}
            />
            <i className="icon ion-chevron-down"></i>
            <i className="icon ion-chevron-up"></i>
          </div>
          <div className="nav-user-popover popover-content">
            <ul className="nav-user-popover-list">
              <li className="nav-user-popover-item">
                <a href="#" onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          </div>
        </Popover>
      );
    }

    return (
      <Popover className="nav-user">
        <div className="nav-user-link">
          <i className="icon ion-person"></i>
          <i className="icon ion-chevron-down"></i>
          <i className="icon ion-chevron-up"></i>
        </div>
        <div className="nav-user-popover popover-content">
          <ul className="nav-user-popover-list">
            <li className="nav-user-popover-item">
              <a href="#" className="button orange block" onClick={this.login}>
                Sign into SoundCloud
              </a>
            </li>
          </ul>
        </div>
      </Popover>
    );
  }

  renderLikesLink() {
    const { authed, dispatch, navigator } = this.props;
    const { route } = navigator;
    if (!authed.user) {
      return null;
    }

    return (
      <div className="nav-nav-item">
        <Link
          className={`nav-nav-user-link ${(route.path[1] === 'likes' ? 'active' : '')}`}
          dispatch={dispatch}
          route={{ path: ['me', 'likes'] }}
        >
          <span className="nav-nav-user-link-text">likes</span>
        </Link>
      </div>
    );
  }

  renderStreamLink() {
    const { authed, dispatch, navigator } = this.props;
    const { route } = navigator;
    const hasNewStreamSongs = authed.newStreamSongs.length > 0;
    if (!authed.user) {
      return null;
    }

    return (
      <div className="nav-nav-item">
        <Link
          className={`nav-nav-user-link ${(route.path[1] === 'stream' ? 'active' : '')}`}
          dispatch={dispatch}
          route={{ path: ['me', 'stream'] }}
        >
          {hasNewStreamSongs ? <div className="nav-nav-user-link-indicator" /> : null}
          <span className="nav-nav-user-link-text">stream</span>
        </Link>
      </div>
    );
  }


  renderPlaylists() {
    const { authed, authedPlaylists, dispatch } = this.props;
    return authed.playlists.map(playlistId => {
      const playlist = authedPlaylists[playlistId];
      return (
        <Link
          className="nav-playlist"
          dispatch={dispatch}
          key={playlistId}
          route={{ path: ['me', 'playlists', playlistId] }}
        >
          <div className="nav-playlist-title">
            {`${playlist.title} (${playlist.track_count})`}
          </div>
          <div className="nav-playlist-images">
            {this.renderArtworks(playlist)}
          </div>
        </Link>
      );
    });
  }

  renderPlaylistsPopover() {
    const { authed, navigator } = this.props;
    const { path } = navigator.route;
    const playlist = this.getPlaylist();

    if (!authed.user) {
      return null;
    }

    return (
      <Popover className="nav-nav-item nav-playlists">
        <div className={`nav-nav-user-link ${(path[1] === 'playlists' ? 'active' : '')}`}>
          <span className="nav-nav-user-link-text">{playlist}</span>
          <i className="icon ion-chevron-down"></i>
          <i className="icon ion-chevron-up"></i>
        </div>
        <div className="nav-playlists-popover popover-content">
          {this.renderPlaylists()}
        </div>
      </Popover>
    );
  }

  render() {
    const { dispatch } = this.props;

    return (
      <div className="nav">
        <div className="container clearfix">
          <div className="nav-logo">
            <i className="icon ion-radio-waves" />
          </div>
          <div className="nav-nav float-left">
            <div className="nav-nav-item">
              <Link
                className="nav-nav-item-link active"
                dispatch={dispatch}
                route={{ path: ['songs'] }}
              >
                SoundRedux
              </Link>
            </div>
            {this.renderStreamLink()}
            {this.renderLikesLink()}
            {this.renderPlaylistsPopover()}
          </div>
          <div className="nav-nav float-right">
            <div className="nav-nav-item">
              <NavSearch dispatch={dispatch} />
            </div>
            <div className="nav-nav-item">
              {this.renderNavUser()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
