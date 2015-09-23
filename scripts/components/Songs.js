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
            let songCards = items.slice(i, i + chunk).map((song) => {
                return <div className='col-1-5'><SongCard song={song} /></div>
            });

            if (songCards.length < chunk) {
                for (let j = 0; j < chunk - songCards.length + 1; j++) {
                    songCards.push(<div className='col-1-5'></div>);
                }
            }

            result.push(
                <div className='songs-row grid'>{songCards}</div>
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
