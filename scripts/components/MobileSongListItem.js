import React, {Component, PropTypes} from 'react';
import {getImageUrl} from '../utils/SongUtils';

class MobileSongListItem extends Component {
    render() {
        const {song, user} = this.props;

        return (
            <div>
                <img src={getImageUrl(song.artwork_url)} />
                <div>
                    <div>
                        {song.title}
                    </div>
                    <div>
                        {user.username}
                    </div>
                </div>
            </div>
        );
    }
}

export default MobileSongListItem;
