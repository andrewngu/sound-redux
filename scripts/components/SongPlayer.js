import React, {Component, PropTypes} from 'react';
import {changePreviousSong, changeNextSong} from '../actions/songs';
import SongDetails from '../components/SongDetails';
import {formatSeconds, formatStreamUrl} from '../helpers/Format';

class SongPlayer extends Component {
    constructor(props) {
        super(props);
        this.changeNextSong = this.changeNextSong.bind(this);
        this.changePreviousSong = this.changePreviousSong.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
        this.handleLoadStart = this.handleLoadStart.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.seek = this.seek.bind(this);
        this.togglePlay = this.togglePlay.bind(this);

        this.state = {
            currentTime: 0,
            duration: 0,
            isPlaying: false,
            isSeeking: false,
        };
    }

    componentDidMount() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.addEventListener('ended', this.handleEnded, false);
        audioElement.addEventListener('loadedmetadata', this.handleLoadedMetadata, false);
        audioElement.addEventListener('loadstart', this.handleLoadStart, false);
        audioElement.addEventListener('play', this.handlePlay, false);
        audioElement.addEventListener('pause', this.handlePause, false);
        audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
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
        audioElement.removeEventListener('play', this.handlePlay, false);
        audioElement.removeEventListener('pause', this.handlePause, false);
        audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    }

    bindMouseEvents() {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    changeNextSong() {
        const {dispatch} = this.props;
        dispatch(changeNextSong())
    }

    changePreviousSong() {
        const {dispatch} = this.props;
        dispatch(changePreviousSong())
    }

    handleEnded() {
        this.changeNextSong();
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

    handleMouseDown(e) {
        this.bindMouseEvents();
        this.setState({
            isSeeking: true,
        });
    }

    handleMouseMove(e) {
        const seekBar = React.findDOMNode(this.refs.seekBar);
        const diff = e.clientX - seekBar.offsetLeft;
        const pos = diff < 0 ? 0 : diff;
        let percent = pos / seekBar.offsetWidth;
        percent = percent > 1 ? 1 : percent;

        this.setState({
            currentTime: Math.floor(percent * this.state.duration)
        });
    }

    handleMouseUp(e) {
        if (!this.state.isSeeking) {
            return;
        }

        this.unbindMouseEvents();
        this.setState({
            isSeeking: false,
        }, function() {
            React.findDOMNode(this.refs.audio).currentTime = this.state.currentTime;
        });
    }

    handlePause() {
        this.setState({isPlaying: false});
    }

    handlePlay() {
        this.setState({isPlaying: true});
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

    seek(e) {
        const audioElement = React.findDOMNode(this.refs.audio);
        const currentTime = Math.floor(((e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth) * this.state.duration);
        audioElement.currentTime = currentTime;
    }

    togglePlay() {
        const audioElement = React.findDOMNode(this.refs.audio);
        if (this.state.isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    unbindMouseEvents() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
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
                        onMouseDown={this.handleMouseDown}>
                    </div>
                </div>
            );
        }
    }

    render() {
        const {song} = this.props;
        const {currentTime, duration, isPlaying} = this.state;

        return (
            <div className='song-player'>
                <audio ref='audio' src={formatStreamUrl(song.stream_url)}></audio>
                <div className='container'>
                    <div className='song-player-main'>
                        <div className='song-player-info song-player-section'>
                            <img className='song-player-image' src={song.artwork_url} />
                            <SongDetails title={song.title} username={song.user.username} />
                        </div>
                        <div className='song-player-controls song-player-section'>
                            <div
                                className='song-player-button'
                                onClick={this.changePreviousSong}>
                                <i className='icon ion-ios-rewind'></i>
                            </div>
                            <div
                                className='song-player-button'
                                onClick={this.togglePlay}>
                                <i className={'icon ' + (isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}></i>
                            </div>
                            <div
                                className='song-player-button'
                                onClick={this.changeNextSong}>
                                <i className='icon ion-ios-fastforward'></i>
                            </div>
                        </div>
                        <div className='song-player-seek song-player-section'>
                            <div className='song-player-seek-bar-wrap' onClick={this.seek}>
                                <div ref='seekBar' className='song-player-seek-bar'>
                                    {this.renderDurationBar()}
                                </div>
                            </div>
                            <div className='song-player-time'>
                                <span>{formatSeconds(currentTime)}</span>
                                <span className='song-player-time-divider'>/</span>
                                <span>{formatSeconds(duration)}</span>
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
