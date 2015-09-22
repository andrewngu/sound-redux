import React, {Component, PropTypes} from 'react';

class SongCard extends Component {
    render() {
        const {song} = this.props;
        const image = song.artwork_url.replace('large', 't300x300');
        return (
            <div className='card song-card'>
                <div className='song-card-image' style={{backgroundImage: `url(${image})`}} />
            </div>
        );
    }
}

SongCard.propTypes = {
    song: PropTypes.object.isRequired,
};

export default SongCard;
