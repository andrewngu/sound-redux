import React, {Component, PropTypes} from 'react';
import {toggleLike} from '../actions/authed';

class SongHeart extends Component {
    constructor() {
        super();
        this.toggleLike = this.toggleLike.bind(this);
    }

    toggleLike() {
        const {dispatch, songId} = this.props;
        dispatch(toggleLike(songId));
    }

    render() {
        const {isLiked} = this.props;
        return (
            <a
                className={'song-heart ' + this.props.className + (isLiked ? ' liked' : '')}
                onClick={this.toggleLike}>
                <i className='icon ion-ios-heart'></i>
            </a>
        );
    }
};

export default SongHeart;
