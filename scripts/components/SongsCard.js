import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import SongDetails from '../components/SongDetails';
import SongHeart from '../components/SongHeart';
import {formatSongTitle} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class SongsCard extends Component {
    render() {
        const {dispatch, isActive, isLiked, playSong, song, user} = this.props;
        const image = getImageUrl(song.artwork_url);

        return (
            <div className={'card songs-card' + (isActive ? ' active' : '')}>
                <div
                    className='songs-card-image'
                    onClick={playSong}
                    style={{backgroundImage: `url(${image})`}}>
                    <div className='songs-card-playing'>
                        <i className={'songs-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                    </div>
                </div>
                <div className='songs-card-user clearfix'>
                    <img
                        className='songs-card-user-image'
                        src={user.avatar_url} />
                    <div className='songs-card-details'>
                        <Link
                            className='songs-card-title'
                            dispatch={dispatch}
                            route={{path: ['songs', song.id]}}>
                            {formatSongTitle(song.title)}
                        </Link>
                        <Link
                            className='songs-card-user-username'
                            dispatch={dispatch}
                            route={{path: ['users', user.id]}}>
                            {user.username}
                        </Link>
                        <SongHeart
                            className='songs-card-heart'
                            dispatch={dispatch}
                            isLiked={isLiked}
                            songId={song.id} />
                    </div>
                </div>
            </div>
        );
    }
}

SongsCard.propTypes = {
    isActive: PropTypes.bool.isRequired,
    playSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
};

export default SongsCard;
