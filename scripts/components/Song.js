import React, {Component, PropTypes} from 'react';

import {playSong} from '../actions/player';

import CommentCard from '../components/CommentCard';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import Waveform from '../components/Waveform';
import {getImageUrl} from '../helpers/SongsHelper';

class Song extends Component {
    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    playSong(i) {
        const {dispatch, song} = this.props;
        dispatch(playSong(song.title, i));
    }

    renderComments() {
        const {height, song} = this.props;
        const {comments} = song;
        if (!comments) {
            return;
        }

        return (
            <div
                className='song-comments'
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{height: height - 220}}>
                {comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
            </div>
        );
    }

    renderSongs() {
        const {dispatch, player, playingSong, songs} = this.props;
        if (!songs.items) {
            return;
        }

        const items = songs.items.slice(1).map((song, i) => {
            return (
                <SongCard
                    dispatch={dispatch}
                    isActive={playingSong.id === song.id}
                    key={song.id}
                    player={player}
                    playSong={this.playSong.bind(this, i + 1)}
                    song={song} />
            );
        });

        return (
            <div className='tab-content'>
                {items}
            </div>
        );
    }

    render() {
        const {dispatch, playingSong, player, song, sticky} = this.props;
        if (song.isFetching) {
            return <Spinner />;
        }

        const isActive = playingSong && playingSong.id === song.id ? true : false;
        const image = getImageUrl(song.artwork_url);
        const {user} = song;

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
                                                <div className='song-username'>{user.username}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='song-waveform'>
                                        <Waveform
                                            currentTime={player.currentTime}
                                            dispatch={dispatch}
                                            duration={song.duration}
                                            isActive={isActive}
                                            waveformUrl={song.waveform_url.replace('https', 'http')} />
                                    </div>
                                </div>
                            </div>
                            {this.renderSongs()}
                        </div>
                        <div className='col-3-10'>
                            <div className={'card sidebar' + (sticky ? ' sticky' : '')}>
                                <div className='sidebar-header'>Comments</div>
                                {this.renderComments()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired
};

export default Stickify(Song, 50);
