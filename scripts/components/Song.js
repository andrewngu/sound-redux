import React, {Component, PropTypes} from 'react';

import {playSong} from '../actions/player';
import {fetchSongIfNeeded} from '../actions/songs';

import Comments from '../components/Comments';
import Link from '../components/Link';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import Waveform from '../components/Waveform';

import {addCommas} from '../helpers/Formatter';
import {getImageUrl} from '../helpers/SongsHelper';

class Song extends Component {
    componentDidMount() {
        const {dispatch, songId} = this.props;
        dispatch(fetchSongIfNeeded(songId));
    }

    playSong(i) {
        const {dispatch, songId, songs} = this.props;
        const song = songs[songId];
        if (!song) {
            return;
        }

        dispatch(playSong(song.title, i));
    }

    renderComments() {
        const {height, player, playingSong, songId, songs} = this.props;
        const song = songs[songId];
        if (!song || !song.comments) {
            return;
        }

        return (
            <Comments
                comments={song.comments}
                currentTime={player.currentTime}
                height={height}
                isActive={playingSong.id === song.id} />
        );
    }

    renderSongs() {
        const {dispatch, player, playingSong, playlists, songId, songs, users} = this.props;
        const song = songs[songId];
        const relatedSongs = song.title && song.title in playlists ? playlists[song.title] : {}
        if (!relatedSongs.items) {
            return;
        }

        const items = relatedSongs.items.slice(1).map((songId, i) => {
            const relatedSong = songs[songId];
            const user = users[relatedSong.user_id];
            return (
                <SongCard
                    dispatch={dispatch}
                    isActive={playingSong.id === relatedSong.id}
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
        const {dispatch, playingSong, player, songId, songs, sticky, users} = this.props;
        const song = songs[songId];
        if (!song || song.isFetching) {
            return <Spinner />;
        }

        const isActive = playingSong && playingSong.id === song.id ? true : false;
        const image = getImageUrl(song.artwork_url);
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
                                            <div className='songs-card-playing'>
                                                <i className={'songs-card-playing-icon icon ' + (isActive ? 'ion-radio-waves' : 'ion-ios-play')}></i>
                                            </div>
                                        </div>
                                        <div className='song-info'>
                                            <div className='song-title'>{song.title}</div>
                                            <div className='song-user'>
                                                <div
                                                    className='song-user-image'
                                                    style={{backgroundImage: `url(${user.avatar_url})`}}>
                                                </div>
                                                <Link
                                                    className='song-username'
                                                    dispatch={dispatch}
                                                    path={['users', user.id]}>
                                                    {user.username}
                                                </Link>
                                            </div>
                                            <div className='song-stats'>
                                                <div className='song-stat'>
                                                    <i className='icon ion-play'></i>
                                                    <span>{addCommas(song.playback_count)}</span>
                                                </div>
                                                <div className='song-stat'>
                                                    <i className='icon ion-ios-heart'></i>
                                                    <span>{addCommas(song.favoritings_count)}</span>
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
