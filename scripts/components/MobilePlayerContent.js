import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {changeCurrentTime, changeSong} from '../actions/player';
import {CHANGE_TYPES, IMAGE_SIZES} from '../constants/SongConstants';
import {formatSongTitle, formatStreamUrl} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';


class MobilePlayerContent extends Component {
    constructor(props) {
        super(props);

        this.changeSong = this.changeSong.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
        this.handleLoadStart = this.handleLoadStart.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.togglePlay = this.togglePlay.bind(this);

        this.state = {
            duration: 0,
            isPlaying: false,
            repeat: false,
            shuffle: false
        };
    }

    componentDidMount() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        audioElement.addEventListener('ended', this.handleEnded, false);
        audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.addEventListener('loadstart', this.handleLoadStart, false);
        audioElement.addEventListener('pause', this.handlePause, false);
        audioElement.addEventListener('play', this.handlePlay, false);
        audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
        audioElement.play();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playingSongId && prevProps.playingSongId === this.props.playingSongId) {
            return;
        }

        ReactDOM.findDOMNode(this.refs.audio).play();
    }

    componentWillUnmount() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        audioElement.removeEventListener('ended', this.handleEnded, false);
        audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.removeEventListener('loadstart', this.handleLoadStart, false);
        audioElement.removeEventListener('pause', this.handlePause, false);
        audioElement.removeEventListener('play', this.handlePlay, false);
        audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    }

    changeSong(changeType, e) {
        if (e) {
            e.preventDefault();
        }

        const {dispatch} = this.props;
        dispatch(changeSong(changeType));
    }

    handleEnded() {
        if (this.state.repeat) {
            ReactDOM.findDOMNode(this.refs.audio).play();
        } else if (this.state.shuffle) {
            this.changeSong(CHANGE_TYPES.SHUFFLE);
        } else {
            this.changeSong(CHANGE_TYPES.NEXT);
        }
    }

    handleLoadedMetadata() {
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        this.setState({
            duration: Math.floor(audioElement.duration)
        });
    }

    handleLoadStart() {
        const {dispatch} = this.props;
        dispatch(changeCurrentTime(0));
        this.setState({
            duration: 0
        });
    }

    handlePause() {
        this.setState({isPlaying: false});
    }

    handlePlay() {
        this.setState({isPlaying: true});
    }

    handleTimeUpdate(e) {
        const {dispatch, player} = this.props;
        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === player.currentTime) {
            return;
        }

        dispatch(changeCurrentTime(currentTime));
    }

    togglePlay(e) {
        e.preventDefault();
        const audioElement = ReactDOM.findDOMNode(this.refs.audio);
        if (this.state.isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    renderDurationBar() {
        const {currentTime} = this.props.player;
        const {duration} = this.state;

        if (duration !== 0) {
            const width = currentTime/duration * 100;
            return (
                <div
                    className='mobile-player-seek-duration-bar'
                    style={{width: `${width}%`}} >
                </div>
            );
        }
    }

    render() {
        const {playingSongId, songs, users} = this.props;
        const {isPlaying} = this.state;
        const song = songs[playingSongId];
        const user = users[song.user_id];
        const image = getImageUrl(song.artwork_url, IMAGE_SIZES.XLARGE);

        return (
            <div className='mobile-player' style={{backgroundImage: `url(${image})`}}>
                <audio id='audio' ref='audio' src={formatStreamUrl(song.stream_url)}></audio>
                <div className='mobile-player-bg'></div>
                <div className='mobile-player-extras'></div>
                <div className='mobile-player-content fade-in'>
                    <div className='mobile-player-info'>
                        <div className='mobile-player-title'>
                            {formatSongTitle(song.title)}
                        </div>
                        <div className='mobile-player-user'>
                            {user.username}
                        </div>
                    </div>
                    <div className='mobile-player-controls'>
                        <a
                            className='mobile-player-button'
                            href='#'
                            onClick={this.changeSong.bind(this, CHANGE_TYPES.PREV)}>
                            <i className='icon ion-ios-rewind'></i>
                        </a>
                        <a
                            className='mobile-player-button'
                            href='#'
                            onClick={this.togglePlay}>
                            <i className={isPlaying ? 'ion-ios-pause' : 'ion-ios-play'}></i>
                        </a>
                        <a
                            className='mobile-player-button'
                            href='#'
                            onClick={this.changeSong.bind(this, CHANGE_TYPES.NEXT)}>
                            <i className='ion-ios-fastforward'></i>
                        </a>
                    </div>
                </div>
                <div className='mobile-player-seek-bar'>
                    {this.renderDurationBar()}
                </div>
            </div>
        );
    }
}

export default MobilePlayerContent;
