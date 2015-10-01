import React, {Component, PropTypes} from 'react';
import {changeActiveSongIndex} from '../actions/player';
import SongDetails from '../components/SongDetails';
import {formatSeconds, formatStreamUrl} from '../helpers/Format';

class SongPlayer extends Component {
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

    changeSong(isNext = true) {
        const {dispatch, player, playlists} = this.props;
        const {activeSongIndex, selectedPlaylists} = player;
        const activePlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        const newActiveIndex = isNext ? activeSongIndex + 1 : activeSongIndex - 1;
        if (newActiveIndex < playlists[activePlaylist].items.length && newActiveIndex >= 0) {
            dispatch(changeActiveSongIndex(newActiveIndex));
        }
    }

    changeVolume(e) {
        const audioElement = React.findDOMNode(this.refs.audio);
        const volume = (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
        audioElement.volume = volume;
    }

    handleEnded() {
        if (this.state.repeat) {
            React.findDOMNode(this.refs.audio).play();
        } else {
            this.changeSong(true);
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
            currentTime: 0,
            duration: 0,
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
        const seekBar = React.findDOMNode(this.refs.seekBar);
        const diff = e.clientX - seekBar.offsetLeft;
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / seekBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        this.setState({
            currentTime: Math.floor(percent * this.state.duration)
        });
    }

    handleSeekMouseUp(e) {
        if (!this.state.isSeeking) {
            return;
        }

        document.removeEventListener('mousemove', this.handleSeekMouseMove);
        document.removeEventListener('mouseup', this.handleSeekMouseUp);

        this.setState({
            isSeeking: false,
        }, function() {
            React.findDOMNode(this.refs.audio).currentTime = this.state.currentTime;
        });
    }

    handleTimeUpdate(e) {
        if (this.state.isSeeking) {
            return;
        }

        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === this.state.currentTime) {
            return;
        }

        this.setState({
            currentTime: currentTime,
        });
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
        const audioElement = React.findDOMNode(this.refs.audio);
        const currentTime = Math.floor(((e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth) * this.state.duration);
        this.setState({
            currentTime: currentTime
        }, function() {
            audioElement.currentTime = currentTime;
        });
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
        const {currentTime, duration} = this.state;

        if (duration !== 0) {
            const width = currentTime/duration * 100;
            return (
                <div
                    className='song-player-seek-duration-bar'
                    style={{width: `${width}%`}} >
                    <div
                        className='song-player-seek-handle'
                        onClick={this.handleMouseClick}
                        onMouseDown={this.handleSeekMouseDown}>
                    </div>
                </div>
            );
        }
    }

    renderVolumeBar() {
        const {muted, volume} = this.state;
        const width = muted ? 0 : volume * 100;
        return (
            <div
                className='song-player-seek-duration-bar'
                style={{width: `${width}%`}}>
                <div
                    className='song-player-seek-handle'
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
                <div className='song-player-volume-button-wrap'>
                    <i className='icon ion-android-volume-up'></i>
                    <i className='icon ion-android-volume-mute'></i>
                </div>
            );
        }

        return (
            <div className='song-player-volume-button-wrap'>
                <i className='icon ion-android-volume-down'></i>
                <i className='icon ion-android-volume-mute'></i>
            </div>
        );
    }

    render() {
        const {song} = this.props;
        const {currentTime, duration, isPlaying} = this.state;

        return (
            <div className='song-player'>
                <audio ref='audio' src={formatStreamUrl(song.stream_url)}></audio>
                <div className='container'>
                    <div className='song-player-main'>
                        <div className='song-player-section song-player-info'>
                            <img className='song-player-image' src={song.artwork_url} />
                            <SongDetails title={song.title} username={song.user.username} />
                        </div>
                        <div className='song-player-section'>
                            <div
                                className='song-player-button'
                                onClick={this.changeSong.bind(this, false)}>
                                <i className='icon ion-ios-rewind'></i>
                            </div>
                            <div
                                className='song-player-button'
                                onClick={this.togglePlay}>
                                <i className={'icon ' + (isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}></i>
                            </div>
                            <div
                                className='song-player-button'
                                onClick={this.changeSong.bind(this, true)}>
                                <i className='icon ion-ios-fastforward'></i>
                            </div>
                        </div>
                        <div className='song-player-section song-player-seek'>
                            <div className='song-player-seek-bar-wrap' onClick={this.seek}>
                                <div className='song-player-seek-bar' ref='seekBar'>
                                    {this.renderDurationBar()}
                                </div>
                            </div>
                            <div className='song-player-time'>
                                <span>{formatSeconds(currentTime)}</span>
                                <span className='song-player-time-divider'>/</span>
                                <span>{formatSeconds(duration)}</span>
                            </div>
                        </div>
                        <div className='song-player-section'>
                            <div
                                className={'song-player-button' + (this.state.repeat ? ' active' : '')}
                                onClick={this.toggleRepeat}>
                                <i className='icon ion-loop'></i>
                            </div>
                            <div
                                className={'song-player-button' + (this.state.shuffle ? ' active' : '')}
                                onClick={this.toggleShuffle}>
                                <i className='icon ion-shuffle'></i>
                            </div>
                            <div
                                className={'song-player-button song-player-volume-button'}
                                onClick={this.toggleMute}>
                                {this.renderVolumeIcon()}
                            </div>
                            <div className='song-player-volume'>
                                <div className='song-player-seek-bar-wrap' onClick={this.changeVolume}>
                                    <div className='song-player-seek-bar' ref='volumeBar'>
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

SongPlayer.propTypes = {
    song: PropTypes.object
};

export default SongPlayer;
