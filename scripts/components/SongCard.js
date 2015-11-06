import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import SongDetails from '../components/SongDetails';
import SongHeart from '../components/SongHeart';
import {IMAGE_SIZES} from '../constants/SongConstants';
import {formatSongTitle} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class SongCard extends Component {
    render() {
        const {authed, dispatch, isActive, playSong, song, user} = this.props;
        const isLiked = song.id in authed.likes && authed.likes[song.id] == 1;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

        return (
            <div className={'card song-card' + (isActive ? ' active' : '')}>
                <a
                    className='song-card-image'
                    href='#'
                    onClick={playSong}
                    style={{backgroundImage: `url(${image})`}}>
                    <div className='song-card-playing'>
                        <i className={'song-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                    </div>
                </a>
                <div className='song-card-user clearfix'>
                    <img
                        className='song-card-user-image'
                        src={getImageUrl(user.avatar_url)} />
                    <div className='song-card-details'>
                        <Link
                            className='song-card-title'
                            dispatch={dispatch}
                            route={{path: ['songs', song.id]}}>
                            {formatSongTitle(song.title)}
                        </Link>
                        <Link
                            className='song-card-user-username'
                            dispatch={dispatch}
                            route={{path: ['users', user.id]}}>
                            {user.username}
                        </Link>
                        <SongHeart
                            authed={authed}
                            className='song-card-heart'
                            dispatch={dispatch}
                            isLiked={isLiked}
                            songId={song.id} />
                    </div>
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    isActive: PropTypes.bool.isRequired,
    playSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
};

export default SongCard;
