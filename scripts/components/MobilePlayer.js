import React, {Component, PropTypes} from 'react';
import {VelocityComponent} from 'velocity-react';
import {IMAGE_SIZES} from '../constants/SongConstants';
import {formatSongTitle} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class MobilePlayer extends Component {
    renderPlayer() {
        const {playingSongId, songs, users} = this.props;
        if (playingSongId === null) {
            return <div></div>;
        }

        const song = songs[playingSongId];
        const user = users[song.user_id];
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.XLARGE);

        return (
            <div className='mobile-player' style={{backgroundImage: `url(${image})`}}>
                <div className='mobile-player-bg'></div>
                <div className='mobile-player-extras'></div>
                <div className='mobile-player-content'>
                    <div className='mobile-player-info'>
                        <div className='mobile-player-title'>
                            {formatSongTitle(song.title)}
                        </div>
                        <div className='mobile-player-user'>
                            {user.username}
                        </div>
                    </div>
                    <div className='mobile-player-controls'>
                        <a className='mobile-player-button'>
                            <i className='icon ion-ios-rewind'></i>
                        </a>
                        <a className='mobile-player-button'>
                            <i className='ion-ios-play'></i>
                        </a>
                        <a className='mobile-player-button'>
                            <i className='ion-ios-fastforward'></i>
                        </a>
                    </div>
                </div>
                <div className='mobile-player-seek-bar'></div>
            </div>
        );
    }

    render() {
        const {playingSongId} = this.props;
        const isSongPlaying = playingSongId !== null;
        return (
            <VelocityComponent animation={{ height: isSongPlaying ? 100 : 0 }} duration={250}>
                {this.renderPlayer()}
            </VelocityComponent>
        );
    }
}

export default MobilePlayer;
