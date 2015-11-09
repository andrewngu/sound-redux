import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import {formatSongTitle} from '../utils/FormatUtils';

class SongDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch, songId, title, userId, username} = this.props;
        return (
            <div className='song-card-details'>
                <Link
                    className='song-card-title'
                    dispatch={dispatch}
                    route={{path: ['songs', songId]}}
                    title={title}>
                    {formatSongTitle(title)}
                </Link>
                <Link
                    className='song-card-user-username'
                    dispatch={dispatch}
                    route={{path: ['users', userId]}}
                    title={username}>
                    {username}
                </Link>
            </div>
        )
    }
}

SongDetails.propTypes = {
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default SongDetails;
