import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';
import {formatStreamUrl} from '../helpers/Format';

class SongPlayer extends Component {
    componentDidMount() {
        React.findDOMNode(this.refs.audio).play();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song && prevProps.song.id === this.props.song.id) {
            return;
        }

        React.findDOMNode(this.refs.audio).play();
    }

    render() {
        const {song} = this.props;
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
                            <div className='song-player-button'>
                                <i className='icon ion-ios-play'></i>
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
