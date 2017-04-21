import React, { Component, PropTypes } from 'react';
import { Motion, presets, spring } from 'react-motion';
import { GENRES } from '../constants/SongConstants';
import Link from '../components/Link';
import { getImageUrl } from '../utils/SongUtils';
import { loginUser, logoutUser } from '../actions/AuthedActions';

const propTypes = {
  authed: PropTypes.object.isRequired,
  authedPlaylists: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

class MobileNav extends Component {
  constructor() {
    super();
    this.toggleGenreMenuOpen = this.toggleGenreMenuOpen.bind(this);
    this.toggleUserMenuOpen = this.toggleUserMenuOpen.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      isGenreMenuOpen: false,
      isUserMenuOpen: false,
    };
  }

  getPlaylistDetails() {
    const { authed, authedPlaylists } = this.props;
    const playlistNames = [];
    let playlistIds = [];
    let playlistDetails = {};

    if (authed.playlists) {
      playlistIds = authed.playlists;
    }

    if (playlistIds) {
      for (const n of playlistIds) {
        playlistNames.push(`PLAYLIST: ${authedPlaylists[n].title}`);
      }
    }

    playlistDetails = {
      playlistNames,
      playlistIds,
    };

    return playlistDetails;
  }

  toggleGenreMenuOpen(e) {
    if (!this.state.isUserMenuOpen) {
      e.preventDefault();
      this.setState({ isGenreMenuOpen: !this.state.isGenreMenuOpen });
    }
  }

  toggleUserMenuOpen(e) {
    e.preventDefault();
    if (!this.state.isGenreMenuOpen) {
      this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
    }
  }

  login(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginUser(false));
  }

  logout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  renderUserOptions() {
    const { authed } = this.props;

    if (authed.user) {
      return (
        <div className="mobile-nav-items">
          <a
            className="mobile-nav-item mobile-nav-auth"
            href="#"
            onClick={this.toggleUserMenuOpen}
          >
            <img
              alt="user avatar"
              className="mobile-nav-authed-image"
              src={getImageUrl(authed.user.avatar_url)}
            />
            {authed.user.username}
          </a>
          <a
            className="mobile-nav-item mobile-nav-auth"
            href="#"
            onClick={this.logout}
          >
            {"Log Out"}
          </a>
        </div>
      );
    }

    return (
      <div className="mobile-nav-items">
        <a
          className="mobile-nav-item mobile-nav-auth"
          href="#"
          onClick={this.login}
        >
          {"Sign into SoundCloud"}
          <i className="icon ion-person" />
        </a>
      </div>
    );
  }

  renderGenreMenu(isGenreMenuOpen, playlist) {
    return (
      <Motion
        style={{ height: spring(isGenreMenuOpen ? (GENRES.length - 1) * 50 : 0, presets.stiff) }}
      >
        {({ height }) =>
          <div
            className="mobile-nav-menu"
            onClick={this.toggleGenreMenuOpen}
            style={{ height }}
          >
            {this.renderGenresTabs(playlist)}
          </div>
        }
      </Motion>
    );
  }

  renderUserMenu(isUserMenuOpen, playlist, getPlaylistDetails) {
    const playlistNames = getPlaylistDetails.playlistNames;
    const tabs = ['stream', 'likes', ...playlistNames];

    return (
      <Motion style={{ height: spring(isUserMenuOpen ? (4) * 50 : 0, presets.stiff) }}>
        {({ height }) =>
          <div
            className="mobile-nav-menu mobile-scrollable"
            onClick={this.toggleUserMenuOpen}
            style={{ height }}
          >
            {this.renderUserTabs(tabs)}
          </div>
        }
      </Motion>
    );
  }

  renderGenresOptions(isGenreMenuOpen, playlist) {
    return (
      <div className="mobile-nav-items">
        <a
          className="mobile-nav-item"
          href="#"
          onClick={this.toggleGenreMenuOpen}
        >
          {playlist}
          <i className={isGenreMenuOpen ? 'ion-chevron-down' : 'ion-chevron-up'} />
        </a>
      </div>
    );
  }

  renderGenresTabs(playlist) {
    return GENRES
      .filter(genre => genre !== playlist)
      .map(genre =>
        <Link
          className="mobile-nav-tab"
          dispatch={this.props.dispatch}
          key={genre}
          route={{ path: ['songs'], query: { q: genre } }}
        >
          {genre}
        </Link>
      );
  }

  renderUserTabs(tabs) {
    return tabs
      .map(tab =>
        <Link
          className="mobile-nav-tab"
          dispatch={this.props.dispatch}
          key={tab}
          route={{ path: ['me', tab] }}
        >
          {tab}
        </Link>
      );
  }

  renderPlaylist() {
    const { navigator } = this.props;
    const { query } = navigator.route;
    const time = query && query.t ? query.t : null;
    let playlist = query && query.q ? query.q : 'house';
    if (time) {
      playlist = `${playlist} - ${time}`;
    }

    return playlist;
  }

  render() {
    const playlist = this.renderPlaylist();
    const { isGenreMenuOpen, isUserMenuOpen } = this.state;
    const getPlaylistDetails = this.getPlaylistDetails();

    return (
      <div className="mobile-nav">
        {this.renderGenreMenu(isGenreMenuOpen, playlist)}
        {this.renderUserMenu(isUserMenuOpen, playlist, getPlaylistDetails)}
        {this.renderGenresOptions(isGenreMenuOpen, playlist)}
        {this.renderUserOptions()}
      </div>
    );
  }
}

MobileNav.propTypes = propTypes;

export default MobileNav;
