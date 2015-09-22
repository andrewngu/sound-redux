import React, {Component, PropTypes} from 'react';

class SongsCard extends Component {
    render() {
        return (
            <div className='card song-card'></div>
        );
    }
}

SongsCard.propTypes = {
    song: PropTypes.object.isRequired,
};

export default SongsCard;
