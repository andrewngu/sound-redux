import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import SongHeartCount from '../components/SongHeartCount';
import Waveform from '../components/Waveform';

import {IMAGE_SIZES} from '../constants/SongConstants';

import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';

import {addCommas} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class SongListItem extends Component {
    renderTogglePlayButton() {
        const {isActive, playSong} = this.props;

        if (isActive) {
            return <TogglePlayButtonContainer />;
        }

        return (
            <div className='toggle-play-button' onClick={playSong}>
                <i className='toggle-play-button-icon ion-ios-play'></i>
            </div>
        );
    }
    render() {
        const {authed, dispatch, isActive, player, playSong, song, user} = this.props;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);

        return (
            <div className={'song-list-item' + (isActive ? ' active' : '')}>
                <div className='song-list-item-detail'>
                    <div
                        className='song-list-item-image'
                        onClick={playSong}
                        style={{backgroundImage: `url(${image})`}}>
                        {this.renderTogglePlayButton()}
                    </div>
                    <div className='song-list-item-info'>
                        <Link
                            className='song-list-item-title'
                            dispatch={dispatch}
                            route={{path: ['songs', song.id]}}>
                            {song.title}
                        </Link>
                        <div className='song-list-item-info-extra'>
                            <div className='song-list-item-user'>
                                <div
                                    className='song-list-item-user-image'
                                    style={{backgroundImage: `url(${getImageUrl(user.avatar_url)})`}}>
                                </div>
                                <Link
                                    className='song-list-item-username'
                                    dispatch={dispatch}
                                    route={{path: ['users', song.user_id]}}>
                                    {user.username}
                                </Link>
                            </div>
                            <div className='song-list-item-stats'>
                                <SongHeartCount
                                    authed={authed}
                                    count={song.favoritings_count}
                                    dispatch={dispatch}
                                    songId={song.id} />
                                <div className='song-list-item-stat'>
                                    <i className='icon ion-play'></i>
                                    <span>{addCommas(song.playback_count)}</span>
                                </div>
                                <div className='song-list-item-stat'>
                                    <i className='icon ion-chatbubble'></i>
                                    <span>{addCommas(song.comment_count)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='song-list-item-waveform'>
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

SongListItem.propTypes = {
    song: PropTypes.object.isRequired
};

export default SongListItem;
