import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';


class SongPlayer extends Component {
    render() {
        const {song} = this.props;
        if (song === null) {
            return <div></div>;
        }

        const image = song.artwork_url.replace('large', 't300x300');

        return (
            <div className='song-player'>
                <div className='song-player-main'>
                    <div className='song-player-info'>
                        <img className='song-player-image' src={image} />
                        <SongDetails title={song.title} username={song.user.username} />
                    </div>
                </div>
            </div>
        );
    }
}

SongPlayer.propTypes = {
    song: PropTypes.object.isRequired
};

export default SongPlayer;
