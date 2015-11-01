import React, {Component, PropTypes} from 'react';
import {loginUser, logoutUser} from '../actions/authed';
import HeaderSearch from '../components/HeaderSearch';
import Link from '../components/Link';
import Popover from '../components/Popover';

const PATHS = ['stream', 'likes'];

class Header extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    getPlaylist() {
        const {authedPlaylists, navigator} = this.props;
        const {path} = navigator.route;

        if (path[0] === 'me'
        && path[1] === 'playlists'
        && path[2] in authedPlaylists) {
            return authedPlaylists[path[2]].title;
        }

        return 'playlists';
    }

    login() {
        const {dispatch} = this.props;
        dispatch(loginUser());
    }

    logout() {
        const {dispatch} = this.props;
        dispatch(logoutUser())
    }

    renderArtworks(playlist) {
        const {songs} = this.props;
        return playlist.tracks.slice(0, 10).map(songId =>
            <img className='header-playlist-image' key={songId} src={songs[songId].artwork_url} />
        );
    }

    renderHeaderUser() {
        const {authed, dispatch, navigator} = this.props;
        const {path} = navigator.route;
        const isActive = path[0] === 'me' ? true : false;
        const targetRoute = isActive ? {path: ['songs'], query: {q: 'house'}} : {path: ['me', 'stream']};

        if (authed.user) {
            return (
                <Popover className='header-user'>
                    <div className='header-user-link'>
                        <img className='header-authed-image' src={authed.user.avatar_url} />
                        <i className='icon ion-chevron-down'></i>
                        <i className='icon ion-chevron-up'></i>
                    </div>
                    <div className='header-user-panel popover-content'>
                        <ul className='header-user-panel-list'>
                            <li className='header-user-panel-item'>
                                <a onClick={this.logout}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            );
        }

        return (
            <Popover className='header-user'>
                <div className='header-user-link'>
                    <i className='icon ion-person'></i>
                    <i className='icon ion-chevron-down'></i>
                    <i className='icon ion-chevron-up'></i>
                </div>
                <div className='header-user-panel popover-content'>
                    <ul className='header-user-panel-list'>
                        <li className='header-user-panel-item'>
                            <a className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
                        </li>
                    </ul>
                </div>
            </Popover>
        );
    }

    renderUserLinks() {
        const {authed, dispatch, navigator} = this.props;
        const {route} = navigator;
        if (!authed.user) {
            return;
        }

        return PATHS.map(path =>
            <div className='header-nav-item' key={path}>
                <Link
                    className={'header-nav-user-link' + (path === route.path[1] ? ' active' : '')}
                    dispatch={dispatch}
                    route={{path: ['me', path]}}>
                    {path}
                </Link>
            </div>
        );
    }

    renderPlaylists() {
        const {authed, authedPlaylists, dispatch} = this.props;
        return authed.playlists.map(playlistId => {
            const playlist = authedPlaylists[playlistId];
            return (
                <Link
                    className='header-playlist'
                    dispatch={dispatch}
                    key={playlistId}
                    route={{path: ['me', 'playlists', playlistId]}}>
                    <div className='header-playlist-title'>
                        {`${playlist.title} (${playlist.track_count})`}
                    </div>
                    <div className='header-playlist-images'>
                        {this.renderArtworks(playlist)}
                    </div>
                </Link>
            );
        });
    }

    renderPlaylistsPopover() {
        const {authed, dispatch, navigator} = this.props;
        const {path} = navigator.route;
        const playlist = this.getPlaylist();

        if (!authed.user) {
            return;
        }

        return (
            <Popover className='header-nav-item header-playlists'>
                <div className={'header-nav-user-link' + (path[1] === 'playlists' ? ' active' : '')}>
                    <div className='header-nav-selected-playlist'>
                        {playlist}
                    </div>
                    <i className='icon ion-chevron-down'></i>
                    <i className='icon ion-chevron-up'></i>
                </div>
                <div className='header-playlists-popover popover-content'>
                    {this.renderPlaylists()}
                </div>
            </Popover>
        );
    }

    render() {
        const {dispatch} = this.props;

        return (
            <div className='header'>
                <div className='container clearfix'>
                    <div className='header-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <div className='header-nav float-left'>
                        <div className='header-nav-item'>
                            <Link
                                className='header-nav-item-link active'
                                dispatch={dispatch}
                                route={{path: ['songs']}}>
                                SoundRedux
                            </Link>
                        </div>
                        {this.renderUserLinks()}
                        {this.renderPlaylistsPopover()}
                    </div>
                    <div className='header-nav float-right'>
                        <div className='header-nav-item'>
                            <HeaderSearch dispatch={dispatch} />
                        </div>
                        <div className='header-nav-item'>
                            {this.renderHeaderUser()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;
