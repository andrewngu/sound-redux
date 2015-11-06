import React, {Component, PropTypes} from 'react';
import {loginUser, toggleLike} from '../actions/authed';
import Popover from '../components/Popover';

class SongHeart extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
    }

    login(e) {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(loginUser(false));
    }

    toggleLike(e) {
        e.preventDefault();
        const {dispatch, songId} = this.props;
        dispatch(toggleLike(songId));
    }

    render() {
        const {authed, isLiked} = this.props;
        if (!authed.user) {
            return (
                <Popover className={'song-heart ' + this.props.className}>
                    <i className='icon ion-ios-heart'></i>
                    <div className='song-heart-panel popover-content'>
                        <ul className='header-user-panel-list'>
                            <li className='header-user-panel-item'>
                                <a href='#' className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            );
        }

        return (
            <a
                className={'song-heart ' + this.props.className + (isLiked ? ' liked' : '')}
                href='#'
                onClick={this.toggleLike}>
                <i className='icon ion-ios-heart'></i>
            </a>
        );
    }
};

export default SongHeart;
