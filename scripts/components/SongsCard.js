import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';
import {getImageUrl} from '../utils/SongUtils';

class SongsCard extends Component {
    render() {
        const {dispatch, isActive, playSong, song, user} = this.props;
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
                    <SongDetails
                        dispatch={dispatch}
                        songId={song.id}
                        userId={user.id}
                        title={song.title}
                        username={user.username} />
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
