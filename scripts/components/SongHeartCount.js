import React, {Component, PropTypes} from 'react';
import {toggleLike} from '../actions/authed';
import {addCommas} from '../utils/FormatUtils';

class SongHeartCount extends Component {
    constructor() {
        super();
        this.toggleLike = this.toggleLike.bind(this);
    }

    toggleLike() {
        const {dispatch, songId} = this.props;
        dispatch(toggleLike(songId));
    }

    render() {
        const {count, isLiked} = this.props;

        return (
            <div
                className={'song-card-stat song-heart-count' + (isLiked ? ' liked' : '')}
                onClick={this.toggleLike}>
                <i className='icon ion-ios-heart'></i>
                <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
            </div>
        );
    }
};

export default SongHeartCount;
