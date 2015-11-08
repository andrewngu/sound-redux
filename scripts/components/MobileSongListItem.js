import React, {Component, PropTypes} from 'react';
import {getImageUrl} from '../utils/SongUtils';

class MobileSongListItem extends Component {
    render() {
        const {playSong, song, user} = this.props;

        return (
            <a
                className='mobile-song-list-item'
                href='#'
                onClick={playSong}>
                <img
                    className='mobile-song-list-item-image'
                    src={getImageUrl(song.artwork_url)} />
                <div className='mobile-song-list-item-info'>
                    <div className='mobile-song-list-item-title'>
                        {song.title}
                    </div>
                    <div className='mobile-song-list-item-user'>
                        {user.username}
                    </div>
                </div>
            </a>
        );
    }
}

export default MobileSongListItem;
