import React, {Component, PropTypes} from 'react';
import {changeActiveSong} from '../actions/songs';
import {formatSongTitle} from '../helpers/Formatter';

class SongDetails extends Component {
    constructor(props) {
        super(props);
        this.changeActiveSong = this.changeActiveSong.bind(this);
    }

    changeActiveSong() {
        const {dispatch, songId} = this.props;
        dispatch(changeActiveSong(songId));
    }

    render() {
        const {title, username} = this.props;

        return (
            <div className='songs-card-details'>
                <a
                    className='songs-card-title'
                    onClick={this.changeActiveSong}>
                    {formatSongTitle(title)}
                </a>
                <div className='songs-card-user-username'>{username}</div>
            </div>
        )
    }
}

SongDetails.propTypes = {
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default SongDetails;
