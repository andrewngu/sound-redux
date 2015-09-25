import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';
import {formatStreamUrl} from '../helpers/Format';

class SongPlayer extends Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.state = {
            isPlaying: false
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
    }

    bindEvents() {
        const audioElement = React.findDOMNode(this.refs.audio);
        audioElement.addEventListener('play', this.handlePlay, false);
        audioElement.addEventListener('pause', this.handlePause, false);
    }

    handlePause() {
        this.setState({isPlaying: false});
    }

    handlePlay() {
        this.setState({isPlaying: true});
    }

    togglePlay() {
        const audioElement = React.findDOMNode(this.refs.audio);
        if (this.state.isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
    }

    render() {
        const {song} = this.props;
        const {isPlaying} = this.state;
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
