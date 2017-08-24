import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { loginUser, logoutUser } from '../actions/AuthedActions';
import { connectLastFM, logoutLastfm } from '../actions/LastfmActions';
import Link from '../components/Link';
import NavSearch from '../components/NavSearch';
import Popover from '../components/Popover';
import NavUser from '../components/NavUser';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  lastfm: PropTypes.object.isRequired,
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
    this.connectLastFM = this.connectLastFM.bind(this);
    this.logoutLastfm = this.logoutLastfm.bind(this);
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

  connectLastFM(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(connectLastFM());
  }

  logoutLastfm(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(logoutLastfm());
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
    const { dispatch, authed, lastfm } = this.props;

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
              <NavUser
                authed={authed}
                lastfm={lastfm}
                onLogin={this.login}
                onLogout={this.logout}
                onLastfmLogin={this.connectLastFM}
                onLastfmLogout={this.logoutLastfm}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
