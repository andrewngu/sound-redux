import React, {Component, PropTypes} from 'react';
import {loginUser, toggleLike} from '../actions/authed';
import Popover from '../components/Popover';
import {addCommas} from '../utils/FormatUtils';

class SongHeartCount extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
    }

    login() {
        const {dispatch} = this.props;
        dispatch(loginUser(false));
    }

    toggleLike() {
        const {dispatch, songId} = this.props;
        dispatch(toggleLike(songId));
    }

    render() {
        const {authed, count, songId} = this.props;
        const isLiked = songId in authed.likes && authed.likes[songId];

        if (!authed.user) {
            return (
                <Popover className={'song-list-item-stat song-heart-count ' + this.props.className}>
                    <div>
                        <i className='icon ion-ios-heart'></i>
                        <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
                    </div>
                    <div className='song-heart-count-panel popover-content'>
                        <ul className='header-user-panel-list'>
                            <li className='header-user-panel-item'>
                                <a className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
                            </li>
                        </ul>
                    </div>
                </Popover>
            );
        }

        return (
            <div
                className={'song-list-item-stat song-heart-count' + (isLiked ? ' liked' : '')}
                onClick={this.toggleLike}>
                <i className='icon ion-ios-heart'></i>
                <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
            </div>
        );
    }
};

export default SongHeartCount;
