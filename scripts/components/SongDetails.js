import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import {formatSongTitle} from '../helpers/Format';

class SongDetails extends Component {
    constructor(props) {
        super(props);
        this.navigateToSong = this.navigateToSong.bind(this);
    }

    navigateToSong() {
        const {dispatch, songId} = this.props;
        dispatch(navigateTo(['songs', songId]));
    }

    render() {
        const {title, username} = this.props;

        return (
            <div className='songs-card-details'>
                <a
                    className='songs-card-title'
                    onClick={this.navigateToSong}>
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
