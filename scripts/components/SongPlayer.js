import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';
import {formatSeconds, formatStreamUrl} from '../helpers/Format';

class SongPlayer extends Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.seek = this.seek.bind(this);
        this.togglePlay = this.togglePlay.bind(this);

        this.state = {
            currentTime: 0,
            duration: 0,
            isPlaying: false,
        };
    }

    componentDidMount() {
        this.bindEvents();
        React.findDOMNode(this.refs.audio).play();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song && prevProps.song.id === this.props.song.id) {
            return;
        }

        React.findDOMNode(this.refs.audio).play();
    }

    componentWillUnmount() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.removeEventListener('play', this.handlePlay, false);
        audioElement.removeEventListener('pause', this.handlePause, false);
        audioElement.removeEventListener('timeupdate', this.handleTimeUpdate, false);
    }

    bindEvents() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.addEventListener('play', this.handlePlay, false);
        audioElement.addEventListener('pause', this.handlePause, false);
        audioElement.addEventListener('timeupdate', this.handleTimeUpdate, false);
    }

    handlePause() {
        this.setState({isPlaying: false});
    }

    handlePlay() {
        this.setState({isPlaying: true});
    }

    handleTimeUpdate(e) {
        const audioElement = e.currentTarget;
        const currentTime = Math.floor(audioElement.currentTime);

        if (currentTime === this.state.currentTime) {
            return;
        }

        this.setState({
            currentTime: currentTime,
            duration: Math.floor(audioElement.duration)
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

    renderDurationBar() {
        const {currentTime, duration} = this.state;

        if (duration !== 0) {
            const width = currentTime/duration * 100;
            return (
                <div
                    className='song-player-seek-duration-bar'
                    style={{width: `${width}%`}} >
                </div>
            );
        }
    }

    render() {
        const {song} = this.props;
        const {currentTime, duration, isPlaying} = this.state;
        const image = song.artwork_url.replace('large', 't300x300');

        return (
            <div className='song-player'>
                <audio ref='audio' src={formatStreamUrl(song.stream_url)}></audio>
                <div className='container'>
                    <div className='song-player-main'>
                        <div className='song-player-main-info'>
                            <img className='song-player-image' src={image} />
                            <SongDetails title={song.title} username={song.user.username} />
                        </div>
                        <div className='song-player-controls'>
                            <div className='song-player-button'>
                                <i className='icon ion-ios-rewind'></i>
                            </div>
                            <div
                                className='song-player-button'
                                onClick={this.togglePlay}>
                                <i className={'icon ' + (isPlaying ? 'ion-ios-pause' : 'ion-ios-play')}></i>
                            </div>
                            <div className='song-player-button'>
                                <i className='icon ion-ios-fastforward'></i>
                            </div>
                        </div>
                        <div className='song-player-seek'>
                            <div className='song-player-seek-bar-wrap' onClick={this.seek}>
                                <div className='song-player-seek-bar'>
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
