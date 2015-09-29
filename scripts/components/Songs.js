import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {changeActiveSongIndex} from '../actions/songs';
import InfiniteScrollify from '../components/InfiniteScrollify';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Toolbar from '../components/Toolbar';


class Songs extends Component {
    constructor(props) {
        super(props);
        this.renderSongs.bind(this);
    }

    changeActiveSongIndex(i) {
        const {dispatch, songs} = this.props;
        dispatch(changeActiveSongIndex(i));
    }

    renderSongs() {
        const chunk = 5;
        const {activeSongIndex, items} = this.props.songs;

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((song, j) => {
                const index = i + j;
                return (
                    <div className='col-1-5' key={song.id}>
                        <SongCard
                            changeActiveSongIndex={this.changeActiveSongIndex.bind(this, index)}
                            isActive={activeSongIndex !== null && activeSongIndex === index}
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
        const {isFetching} = this.props.songs;

        return (
            <div>
                <Toolbar />
                <div className='container'>
                    <div className='content'>
                        {this.renderSongs()}
                        {isFetching ? <Spinner /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

Songs.propTypes = {
    songs: PropTypes.object.isRequired,
};

export default InfiniteScrollify(Songs);
