import React, {Component, PropTypes} from 'react';
import {getImageUrl} from '../helpers/SongsHelper';

class SongCard extends Component {
    render() {
        const {song} = this.props;
        const {user} = song;
        const image = getImageUrl(song.artwork_url);

        return (
            <div className='song-card'>
                <div
                    className='song-card-image'
                    style={{backgroundImage: `url(${image})`}}>
                </div>
                <div className='song-card-info'>
                    <div className='song-card-title'>
                        {song.title}
                    </div>
                    <div className='song-card-user'>
                        <div
                            className='song-card-user-image'
                            style={{backgroundImage: `url(${user.avatar_url})`}}>
                        </div>
                        <div className='song-card-username'>
                            {user.username}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SongCard.propTypes = {
    song: PropTypes.object.isRequired
};

export default SongCard;
