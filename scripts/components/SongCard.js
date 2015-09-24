import React, {Component, PropTypes} from 'react';
import SongDetails from '../components/SongDetails';

class SongCard extends Component {
    render() {
        const {changeActiveSong, song} = this.props;
        const image = song.artwork_url.replace('large', 't300x300');
        return (
            <div className='card song-card'>
                <div
                    className='song-card-image'
                    onClick={changeActiveSong}
                    style={{backgroundImage: `url(${image})`}} />
                <div className='song-card-user'>
                    <img
                        className='song-card-user-image'
                        onClick={this.handleClick}
                        src={song.user.avatar_url} />
                    <SongDetails title={song.title} username={song.user.username} />
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    song: PropTypes.object.isRequired,
};

export default SongCard;
