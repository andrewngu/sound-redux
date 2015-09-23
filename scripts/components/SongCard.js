import React, {Component, PropTypes} from 'react';
import {formatSongTitle} from '../helpers/Format';

class SongCard extends Component {
    render() {
        const {song} = this.props;
        const image = song.artwork_url.replace('large', 't300x300');
        return (
            <div className='card song-card'>
                <div className='song-card-image' style={{backgroundImage: `url(${image})`}} />
                <div className='song-card-user'>
                    <img className='song-card-user-image' src={song.user.avatar_url} />
                    <div className='song-card-details'>
                        <div className='song-card-title'>{formatSongTitle(song.title)}</div>
                        <div className='song-card-user-username'>{song.user.username}</div>
                    </div>
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    song: PropTypes.object.isRequired,
};

export default SongCard;
