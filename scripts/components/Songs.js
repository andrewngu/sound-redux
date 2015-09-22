import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SongCard from '../components/SongCard';


class Songs extends Component {
    constructor(props) {
        super(props);
        this.renderSongs.bind(this);
    }

    renderSongs() {
        const chunk = 5;
        const {items} = this.props.songs;

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((song) => <SongCard song={song} />);

            if (songCards.length < chunk) {
                for (let j = 0; j < chunk - songCards.length + 1; j++) {
                    songCards.push(<div className='song-card-placeholder'></div>);
                }
            }

            result.push(
                <div className='songs-row'>{songCards}</div>
            );
        }

        return result;
    }

    render() {
        return (
            <div>
                {this.renderSongs()}
            </div>
        );
    }
}

Songs.propTypes = {
    songs: PropTypes.object.isRequired,
};

export default Songs;
