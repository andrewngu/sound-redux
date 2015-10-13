import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import {formatSongTitle} from '../helpers/Formatter';

class SongDetails extends Component {
    constructor(props) {
        super(props);
        this.navigateToSong = this.navigateToSong.bind(this);
        this.navigateToUser = this.navigateToUser.bind(this);
    }

    navigateToSong() {
        const {dispatch, songId} = this.props;
        dispatch(navigateTo(['songs', songId]));
    }

    navigateToUser() {
        const {dispatch, userId} = this.props;
        dispatch(navigateTo(['users', userId]))
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
                <a
                    className='songs-card-user-username'
                    onClick={this.navigateToUser}>
                    {username}
                </a>
            </div>
        )
    }
}

SongDetails.propTypes = {
    title: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default SongDetails;
