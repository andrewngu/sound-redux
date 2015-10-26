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
            <div className='songs-card-details'>
                <Link
                    className='songs-card-title'
                    dispatch={dispatch}
                    route={{path: ['songs', songId]}}>
                    {formatSongTitle(title)}
                </Link>
                <Link
                    className='songs-card-user-username'
                    dispatch={dispatch}
                    route={{path: ['users', userId]}}>
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
