import React, {Component, PropTypes} from 'react';
import {getImageUrl} from '../helpers/SongsHelper';

class Song extends Component {
    render() {
        const {song} = this.props;
        const image = getImageUrl(song.image);

        return (
            <div className='container song'>
                <div className='content'>
                    <div className='song grid'>
                        <div className='col-7-10'>
                            <div className='song-card card'>
                                <div className='song-card-main'>
                                    <div
                                        className='song-card-image'
                                        style={{backgroundImage: `url(${image})`}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-3-10'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired
};

export default Song;
