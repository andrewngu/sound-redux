import React, {Component, PropTypes} from 'react';
import {formatSongTitle} from '../helpers/Format';

class SongDetails extends Component {
    render() {
        const {title, username} = this.props;

        return (
            <div className='song-card-details'>
                <div className='song-card-title'>{formatSongTitle(title)}</div>
                <div className='song-card-user-username'>{username}</div>
            </div>
        )
    }
}

SongDetails.propTypes = {
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default SongDetails;
