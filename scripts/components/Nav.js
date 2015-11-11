import React, {Component, PropTypes} from 'react';
import {loginUser, logoutUser} from '../actions/authed';
import Link from '../components/Link';
import NavSearch from '../components/NavSearch';
import Popover from '../components/Popover';
import {getImageUrl} from '../utils/SongUtils';

const PATHS = ['stream', 'likes'];

class Nav extends Component {
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

    login(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(loginUser());
    }

    logout(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(logoutUser())
    }

    renderArtworks(playlist) {
        const {songs} = this.props;
        return playlist.tracks.slice(0, 10).map(songId =>
            <img className='nav-playlist-image' key={songId} src={getImageUrl(songs[songId].artwork_url)} />
        );
    }

    renderNavUser() {
        const {authed, dispatch, navigator} = this.props;
        const {path} = navigator.route;
        const isActive = path[0] === 'me' ? true : false;
        const targetRoute = isActive ? {path: ['songs'], query: {q: 'house'}} : {path: ['me', 'stream']};

        if (authed.user) {
            return (
                <Popover className='nav-user'>
                    <div className='nav-user-link'>
                        <img className='nav-authed-image' src={getImageUrl(authed.user.avatar_url)} />
                        <i className='icon ion-chevron-down'></i>
                        <i className='icon ion-chevron-up'></i>
                    </div>
                    <div className='nav-user-panel popover-content'>
                        <ul className='nav-user-panel-list'>
                            <li className='nav-user-panel-item'>
                                <a href='#' onClick={this.logout}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            );
        }

        return (
            <Popover className='nav-user'>
                <div className='nav-user-link'>
                    <i className='icon ion-person'></i>
                    <i className='icon ion-chevron-down'></i>
                    <i className='icon ion-chevron-up'></i>
                </div>
                <div className='nav-user-panel popover-content'>
                    <ul className='nav-user-panel-list'>
                        <li className='nav-user-panel-item'>
                            <a href='#' className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
                        </li>
                    </ul>
                </div>
            </Popover>
        );
    }

    renderLikesLink() {
        const {authed, dispatch, navigator} = this.props;
        const {route} = navigator;
        if (!authed.user) {
            return;
        }

        return (
            <div className='nav-nav-item'>
                <Link
                    className={'nav-nav-user-link' + ('likes' === route.path[1] ? ' active' : '')}
                    dispatch={dispatch}
                    route={{path: ['me', 'likes']}}>
                    likes
                </Link>
            </div>
        );
    }

    renderStreamLink() {
        const {authed, dispatch, navigator} = this.props;
        const {route} = navigator;
        const hasNewStreamSongs = authed.newStreamSongs.length > 0;
        if (!authed.user) {
            return;
        }

        return (
            <div className='nav-nav-item'>
                <Link
                    className={'nav-nav-user-link' + ('stream' === route.path[1] ? ' active' : '')}
                    dispatch={dispatch}
                    route={{path: ['me', 'stream']}}>
                    {hasNewStreamSongs ? <div className='nav-nav-user-link-indicator'></div> : null}
                    stream
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
                    className='nav-playlist'
                    dispatch={dispatch}
                    key={playlistId}
                    route={{path: ['me', 'playlists', playlistId]}}>
                    <div className='nav-playlist-title'>
                        {`${playlist.title} (${playlist.track_count})`}
                    </div>
                    <div className='nav-playlist-images'>
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
            <Popover className='nav-nav-item nav-playlists'>
                <div className={'nav-nav-user-link' + (path[1] === 'playlists' ? ' active' : '')}>
                    <div className='nav-nav-selected-playlist'>
                        {playlist}
                    </div>
                    <i className='icon ion-chevron-down'></i>
                    <i className='icon ion-chevron-up'></i>
                </div>
                <div className='nav-playlists-popover popover-content'>
                    {this.renderPlaylists()}
                </div>
            </Popover>
        );
    }

    render() {
        const {dispatch} = this.props;

        return (
            <div className='nav'>
                <div className='container clearfix'>
                    <div className='nav-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <div className='nav-nav float-left'>
                        <div className='nav-nav-item'>
                            <Link
                                className='nav-nav-item-link active'
                                dispatch={dispatch}
                                route={{path: ['songs']}}>
                                SoundRedux
                            </Link>
                        </div>
                        {this.renderStreamLink()}
                        {this.renderLikesLink()}
                        {this.renderPlaylistsPopover()}
                    </div>
                    <div className='nav-nav float-right'>
                        <div className='nav-nav-item'>
                            <NavSearch dispatch={dispatch} />
                        </div>
                        <div className='nav-nav-item'>
                            {this.renderNavUser()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {

};

export default Nav;
