import React, {Component, PropTypes} from 'react';

import {playSong} from '../actions/player';
import {fetchSongIfNeeded} from '../actions/songs';

import Comments from '../components/Comments';
import Link from '../components/Link';
import SongListItem from '../components/SongListItem';
import SongHeartCount from '../components/SongHeartCount';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import Waveform from '../components/Waveform';

import {SONG_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';
import {IMAGE_SIZES} from '../constants/SongConstants';

import {addCommas} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';

class Song extends Component {
    componentWillMount() {
        const {dispatch, songId} = this.props;
        dispatch(fetchSongIfNeeded(songId));
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, songId} = this.props;
        if (nextProps.songId !== songId) {
            dispatch(fetchSongIfNeeded(nextProps.songId));
        }
    }

    playSong(i) {
        const {dispatch, songId, songs} = this.props;
        const song = songs[songId];
        if (!song) {
            return;
        }

        dispatch(playSong(song.title + SONG_PLAYLIST_SUFFIX, i));
    }

    renderComments() {
        const {height, player, playingSongId, songId, songs} = this.props;
        const song = songs[songId];
        if (!song || !song.comments) {
            return;
        }

        return (
            <Comments
                comments={song.comments}
                currentTime={player.currentTime}
                height={height}
                isActive={playingSongId === song.id} />
        );
    }

    renderSongs() {
        const {authed, dispatch, player, playingSongId, playlists, songId, songs, users} = this.props;
        const {likes} = authed;
        const song = songs[songId];
        const playlist = song.title + SONG_PLAYLIST_SUFFIX;
        const relatedSongs = playlist in playlists ? playlists[playlist] : {}
        if (!relatedSongs.items) {
            return;
        }

        const items = relatedSongs.items.slice(1).map((songId, i) => {
            const relatedSong = songs[songId];
            const user = users[relatedSong.user_id];
            return (
                <SongListItem
                    authed={authed}
                    dispatch={dispatch}
                    isActive={playingSongId === relatedSong.id}
                    key={relatedSong.id}
                    player={player}
                    playSong={this.playSong.bind(this, i + 1)}
                    song={relatedSong}
                    user={user} />
            );
        });

        return (
            <div className='tab-content'>
                {items}
            </div>
        );
    }

    render() {
        const {authed, dispatch, playingSongId, player, songId, songs, sticky, users} = this.props;
        const song = songs[songId];
        if (!song) {
            return <Spinner />;
        }

        const isActive = playingSongId && playingSongId === song.id ? true : false;
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);
        const user = song.user_id in users ? users[song.user_id] : {};

        return (
            <div className='container'>
                <div className='content'>
                    <div className='grid'>
                        <div className='col-7-10'>
                            <div className={'song card' + (isActive ? ' active' : '')}>
                                <div className='song-main'>
                                    <div className='song-detail'>
                                        <div
                                            className='song-image'
                                            onClick={this.playSong.bind(this, 0)}
                                            style={{backgroundImage: `url(${image})`}}>
                                            <div className='song-card-playing'>
                                                <i className={'song-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                                            </div>
                                        </div>
                                        <div className='song-info'>
                                            <div className='song-title'>{song.title}</div>
                                            <div className='song-user'>
                                                <div
                                                    className='song-user-image'
                                                    style={{backgroundImage: `url(${getImageUrl(user.avatar_url)})`}}>
                                                </div>
                                                <Link
                                                    className='song-username'
                                                    dispatch={dispatch}
                                                    route={{path: ['users', user.id]}}>
                                                    {user.username}
                                                </Link>
                                            </div>
                                            <div className='song-stats'>
                                                <SongHeartCount
                                                    authed={authed}
                                                    count={song.favoritings_count}
                                                    dispatch={dispatch}
                                                    songId={song.id} />
                                                <div className='song-stat'>
                                                    <i className='icon ion-play'></i>
                                                    <span>{addCommas(song.playback_count)}</span>
                                                </div>
                                                <div className='song-stat'>
                                                    <i className='icon ion-chatbubble'></i>
                                                    <span>{addCommas(song.comment_count)}</span>
                                                </div>
                                            </div>
                                            <div className='song-description'>
                                                {song.description}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='song-waveform'>
                                        <Waveform
                                            currentTime={player.currentTime}
                                            dispatch={dispatch}
                                            duration={song.duration}
                                            isActive={isActive}
                                            playSong={this.playSong.bind(this, 0)}
                                            waveformUrl={song.waveform_url.replace('https', 'http')} />
                                    </div>
                                </div>
                            </div>
                            {this.renderSongs()}
                        </div>
                        <div className='col-3-10'>
                            <div className={'sidebar' + (sticky ? ' sticky' : '')}>
                                {this.renderComments()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Stickify(Song, 50);
