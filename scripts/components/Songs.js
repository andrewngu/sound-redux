import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeActiveSong} from '../actions/songs';
import InfiniteScrollify from '../components/InfiniteScrollify';
import SongCard from '../components/SongCard';


class Songs extends Component {
    constructor(props) {
        super(props);
        this.renderSongs.bind(this);
    }

    changeActiveSong(i) {
        const {dispatch, songs} = this.props;
        dispatch(changeActiveSong(songs.items[i]));
    }

    renderSongs() {
        const chunk = 5;
        const {items} = this.props.songs;

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((song, j) => {
                return (
                    <div className='col-1-5' key={song.id}>
                        <SongCard
                            changeActiveSong={this.changeActiveSong.bind(this, i + j)}
                            song={song} />
                    </div>
                );
            }, this);

            if (songCards.length < chunk) {
                for (let j = 0; j < chunk - songCards.length + 1; j++) {
                    songCards.push(<div className='col-1-5' key={'song-placeholder-' + j}></div>);
                }
            }

            result.push(
                <div className='songs-row grid' key={'songs-row-' + i}>{songCards}</div>
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

export default InfiniteScrollify(Songs);
