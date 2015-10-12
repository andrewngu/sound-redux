import React, {Component, PropTypes} from 'react';
import {changeCurrentTime, changeSong} from '../actions/player';
import Playlist from '../components/Playlist';
import Popover from '../components/Popover';
import SongDetails from '../components/SongDetails';
import {CHANGE_TYPES} from '../constants/SongConstants';
import {formatSeconds, formatStreamUrl} from '../helpers/Formatter';

class Player extends Component {
    constructor(props) {
        super(props);
        this.changeSong = this.changeSong.bind(this);
        this.changeVolume = this.changeVolume.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
        this.handleLoadStart = this.handleLoadStart.bind(this);
        this.handleSeekMouseDown = this.handleSeekMouseDown.bind(this);
        this.handleSeekMouseMove = this.handleSeekMouseMove.bind(this);
        this.handleSeekMouseUp = this.handleSeekMouseUp.bind(this);
        this.handleVolumeMouseDown = this.handleVolumeMouseDown.bind(this);
        this.handleVolumeMouseMove = this.handleVolumeMouseMove.bind(this);
        this.handleVolumeMouseUp = this.handleVolumeMouseUp.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
        this.seek = this.seek.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.toggleRepeat = this.toggleRepeat.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);

        this.state = {
            activePlaylistIndex: null,
            currentTime: 0,
            duration: 0,
            isPlaying: false,
            isSeeking: false,
            muted: false,
            repeat: false,
            shuffle: false,
            volume: 1,
        };
    }

    componentDidMount() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.addEventListener('ended', this.handleEnded, false);
        audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.addEventListener('loadstart', this.handleLoadStart, false);
        audioElement.addEventListener('pause', this.handlePause, false);
        audioElement.addEventListener('play', this.handlePlay, false);
        audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
        audioElement.addEventListener('volumechange', this.handleVolumeChange, false);
        audioElement.play();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song && prevProps.song.id === this.props.song.id) {
            return;
        }

        React.findDOMNode(this.refs.audio).play();
    }

    componentWillUnmount() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.removeEventListener('ended', this.handleEnded, false);
        audioElement.removeEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.removeEventListener('loadstart', this.handleLoadStart, false);
        audioElement.removeEventListener('pause', this.handlePause, false);
        audioElement.removeEventListener('play', this.handlePlay, false);
        audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
        audioElement.removeEventListener('volumechange', this.handleVolumeChange, false);
    }

    bindSeekMouseEvents() {
        document.addEventListener('mousemove', this.handleSeekMouseMove);
        document.addEventListener('mouseup', this.handleSeekMouseUp);
    }

    bindVolumeMouseEvents() {
        document.addEventListener('mousemove', this.handleVolumeMouseMove);
        document.addEventListener('mouseup', this.handleVolumeMouseUp);
    }

    changeSong(changeType) {
        const {dispatch} = this.props;
        dispatch(changeSong(changeType));
    }

    changeVolume(e) {
        const audioElement = React.findDOMNode(this.refs.audio);
        const volume = (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
        audioElement.volume = volume;
    }

    handleEnded() {
        if (this.state.repeat) {
            React.findDOMNode(this.refs.audio).play();
        } else if (this.state.shuffle) {
            this.changeSong(CHANGE_TYPES.SHUFFLE);
        } else {
            this.changeSong(CHANGE_TYPES.NEXT);
        }
    }

    handleLoadedMetadata() {
        const audioElement = React.findDOMNode(this.refs.audio);
        this.setState({
            duration: Math.floor(audioElement.duration)
        });
    }

    handleLoadStart() {
        this.setState({
            duration: 0
        });
    }

    handleMouseClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handlePause() {
        this.setState({isPlaying: false});
    }

    handlePlay() {
        this.setState({isPlaying: true});
    }

    handleSeekMouseDown(e) {
        this.bindSeekMouseEvents();
        this.setState({
            isSeeking: true,
        });
    }

    handleSeekMouseMove(e) {
        const {dispatch} = this.props;
        const seekBar = React.findDOMNode(this.refs.seekBar);
        const diff = e.clientX - seekBar.offsetLeft;
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / seekBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        dispatch(changeCurrentTime(Math.floor(percent * this.state.duration)));
    }

    handleSeekMouseUp(e) {
        if (!this.state.isSeeking) {
            return;
        }

        document.removeEventListener('mousemove', this.handleSeekMouseMove);
        document.removeEventListener('mouseup', this.handleSeekMouseUp);
        const {currentTime} = this.props.player;

        this.setState({
            isSeeking: false,
        }, function() {
            React.findDOMNode(this.refs.audio).currentTime = currentTime;
        });
    }

    handleTimeUpdate(e) {
        if (this.state.isSeeking) {
            return;
        }

        const {dispatch, player} = this.props;
        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === player.currentTime) {
            return;
        }

        dispatch(changeCurrentTime(currentTime));
    }

    handleVolumeChange(e) {
        if (this.state.isSeeking) {
            return;
        }

        this.setState({
            volume: e.currentTarget.volume
        });
    }

    handleVolumeMouseDown(e) {
        this.bindVolumeMouseEvents();
        this.setState({
            isSeeking: true,
        });
    }

    handleVolumeMouseMove(e) {
        const volumeBar = React.findDOMNode(this.refs.volumeBar);
        const diff = e.clientX - volumeBar.offsetLeft;
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / volumeBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        this.setState({
            volume: percent
        });
        React.findDOMNode(this.refs.audio).volume = percent;
    }

    handleVolumeMouseUp(e) {
        if (!this.state.isSeeking) {
            return;
        }

        document.removeEventListener('mousemove', this.handleVolumeMouseMove);
        document.removeEventListener('mouseup', this.handleVolumeMouseUp);

        this.setState({
            isSeeking: false,
        }, function() {
            React.findDOMNode(this.refs.audio).volume = this.state.volume;
        });
    }

    seek(e) {
        const {dispatch} = this.props;
        const audioElement = React.findDOMNode(this.refs.audio);
        const currentTime = Math.floor(((e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth) * this.state.duration);

        dispatch(changeCurrentTime(currentTime));
        audioElement.currentTime = currentTime;
    }

    toggleMute() {
        const audioElement = React.findDOMNode(this.refs.audio);
        if (this.state.muted) {
            audioElement.muted = false;
        } else {
            audioElement.muted = true;
        }

        this.setState({muted: !this.state.muted});
    }

    togglePlay() {
        const audioElement = React.findDOMNode(this.refs.audio);
        if (this.state.isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    toggleRepeat() {
        this.setState({repeat: !this.state.repeat});
    }

    toggleShuffle() {
        this.setState({shuffle: !this.state.shuffle});
    }

    renderDurationBar() {
        const {currentTime} = this.props.player;
        const {duration} = this.state;

        if (duration !== 0) {
            const width = currentTime/duration * 100;
            return (
                <div
                    className='player-seek-duration-bar'
                    style={{width: `${width}%`}} >
                    <div
                        className='player-seek-handle'
                        onClick={this.handleMouseClick}
                        onMouseDown={this.handleSeekMouseDown}>
                    </div>
                </div>
            );
        }
    }

    renderPlaylist() {
        const {dispatch, player, playlists} = this.props;

        return (
            <Playlist
                dispatch={dispatch}
                player={player}
                playlists={playlists} />
        );
    }

    renderVolumeBar() {
        const {muted, volume} = this.state;
        const width = muted ? 0 : volume * 100;
        return (
            <div
                className='player-seek-duration-bar'
                style={{width: `${width}%`}}>
                <div
                    className='player-seek-handle'
                    onClick={this.handleMouseClick}
                    onMouseDown={this.handleVolumeMouseDown}>
                </div>
            </div>
        );
    }

    renderVolumeIcon() {
        const {muted, volume} = this.state;

        if (muted) {
            return <i className='icon ion-android-volume-off'></i>;
        }

        if (volume === 0) {
            return <i className='icon ion-android-volume-mute'></i>;
        } else if (volume === 1) {
            return (
                <div className='player-volume-button-wrap'>
                    <i className='icon ion-android-volume-up'></i>
                    <i className='icon ion-android-volume-mute'></i>
                </div>
            );
        }

        return (
            <div className='player-volume-button-wrap'>
                <i className='icon ion-android-volume-down'></i>
                <i className='icon ion-android-volume-mute'></i>
            </div>
        );
    }

    render() {
        const {dispatch, player, song} = this.props;
        const {currentTime} = player;
        const {duration, isPlaying} = this.state;

        return (
            <div className='player'>
                <audio id='audio' ref='audio' src={formatStreamUrl(song.stream_url)}></audio>
                <div className='container'>
                    <div className='player-main'>
                        <div className='player-section player-info'>
                            <img className='player-image' src={song.artwork_url} />
                            <SongDetails
                                dispatch={dispatch}
                                songId={song.id}
                                title={song.title}
                                username={song.user.username} />
                        </div>
                        <div className='player-section'>
                            <div
                                className='player-button'
                                onClick={this.changeSong.bind(this, CHANGE_TYPES.PREV)}>
                                <i className='icon ion-ios-rewind'></i>
                            </div>
                            <div
                                className='player-button'
                                onClick={this.togglePlay}>
                                <i className={'icon ' + (isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}></i>
                            </div>
                            <div
                                className='player-button'
                                onClick={this.changeSong.bind(this, this.state.shuffle ? CHANGE_TYPES.SHUFFLE: CHANGE_TYPES.NEXT)}>
                                <i className='icon ion-ios-fastforward'></i>
                            </div>
                        </div>
                        <div className='player-section player-seek'>
                            <div className='player-seek-bar-wrap' onClick={this.seek}>
                                <div className='player-seek-bar' ref='seekBar'>
                                    {this.renderDurationBar()}
                                </div>
                            </div>
                            <div className='player-time'>
                                <span>{formatSeconds(currentTime)}</span>
                                <span className='player-time-divider'>/</span>
                                <span>{formatSeconds(duration)}</span>
                            </div>
                        </div>
                        <div className='player-section'>
                            <div
                                className={'player-button' + (this.state.repeat ? ' active' : '')}
                                onClick={this.toggleRepeat}>
                                <i className='icon ion-loop'></i>
                            </div>
                            <div
                                className={'player-button' + (this.state.shuffle ? ' active' : '')}
                                onClick={this.toggleShuffle}>
                                <i className='icon ion-shuffle'></i>
                            </div>
                            <Popover className={'player-button'}>
                                <i className='icon ion-android-list'></i>
                                {this.renderPlaylist()}
                            </Popover>
                            <div
                                className={'player-button player-volume-button'}
                                onClick={this.toggleMute}>
                                {this.renderVolumeIcon()}
                            </div>
                            <div className='player-volume'>
                                <div className='player-seek-bar-wrap' onClick={this.changeVolume}>
                                    <div className='player-seek-bar' ref='volumeBar'>
                                        {this.renderVolumeBar()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    song: PropTypes.object
};

export default Player;
