import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import SongHeartCount from '../components/SongHeartCount';
import Waveform from '../components/Waveform';

import {IMAGE_SIZES} from '../constants/SongConstants';

import {addCommas} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class SongCard extends Component {
    render() {
        const {authed, dispatch, isActive, player, playSong, song, user} = this.props;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

        return (
            <div className={'song-card' + (isActive ? ' active' : '')}>
                <div className='song-card-detail'>
                    <div
                        className='song-card-image'
                        onClick={playSong}
                        style={{backgroundImage: `url(${image})`}}>
                        <div className='songs-card-playing'>
                            <i className={'songs-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                        </div>
                    </div>
                    <div className='song-card-info'>
                        <Link
                            className='song-card-title'
                            dispatch={dispatch}
                            route={{path: ['songs', song.id]}}>
                            {song.title}
                        </Link>
                        <div className='song-card-info-extra'>
                            <div className='song-card-user'>
                                <div
                                    className='song-card-user-image'
                                    style={{backgroundImage: `url(${user.avatar_url})`}}>
                                </div>
                                <Link
                                    className='song-card-username'
                                    dispatch={dispatch}
                                    route={{path: ['users', song.user_id]}}>
                                    {user.username}
                                </Link>
                            </div>
                            <div className='song-card-stats'>
                                <SongHeartCount
                                    authed={authed}
                                    count={song.favoritings_count}
                                    dispatch={dispatch}
                                    songId={song.id} />
                                <div className='song-card-stat'>
                                    <i className='icon ion-play'></i>
                                    <span>{addCommas(song.playback_count)}</span>
                                </div>
                                <div className='song-card-stat'>
                                    <i className='icon ion-chatbubble'></i>
                                    <span>{addCommas(song.comment_count)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='song-card-waveform'>
                    <Waveform
                        currentTime={player.currentTime}
                        dispatch={dispatch}
                        duration={song.duration}
                        isActive={isActive}
                        playSong={playSong}
                        waveformUrl={song.waveform_url.replace('https', 'http')} />
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    song: PropTypes.object.isRequired
};

export default SongCard;
