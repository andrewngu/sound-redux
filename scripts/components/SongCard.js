import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';
import {getImageUrl} from '../helpers/Format';

class SongCard extends Component {
    render() {
        const {isActive, playSong, song} = this.props;
        const image = getImageUrl(song.artwork_url);

        return (
            <div className={'card song-card' + (isActive ? ' active' : '')}>
                <div
                    className='song-card-image'
                    onClick={playSong}
                    style={{backgroundImage: `url(${image})`}}>
                    <div className='song-card-playing'>
                        <i className={'song-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                    </div>
                </div>
                <div className='song-card-user'>
                    <img
                        className='song-card-user-image'
                        onClick={this.handleClick}
                        src={song.user.avatar_url} />
                    <SongDetails title={song.title} username={song.user.username} />
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
