import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {playSong} from '../actions/player';

import InfiniteScrollify from '../components/InfiniteScrollify';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import Toolbar from '../components/Toolbar';


class Songs extends Component {
    constructor(props) {
        super(props);
        this.getActiveSong = this.getActiveSong.bind(this);
        this.renderSongs = this.renderSongs.bind(this);
    }

    getActiveSong() {
        const {player} = this.props;
        const {activePlaylist, activeSongIndex, playlists} = player;

        if (activePlaylist === null || activeSongIndex === null) {
            return {};
        }

        return playlists[activePlaylist].songs[activeSongIndex];
    }

    changeActiveSongIndex(i) {
        const {dispatch, songs} = this.props;
        dispatch(playSong(songs.category, i, songs.items));
    }

    renderSongs() {
        const chunk = 5;
        const {playlists, songs} = this.props;
        const {activePlaylist} = songs;
        const items = activePlaylist in playlists ? playlists[activePlaylist].items : [];
        const activeSong = this.getActiveSong();

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((song, j) => {
                const index = i + j;
                return (
                    <div className='col-1-5' key={song.id}>
                        <SongCard
                            changeActiveSongIndex={this.changeActiveSongIndex.bind(this, index)}
                            isActive={song.id === activeSong.id}
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
        const {dispatch, songs, sticky} = this.props;
        const {category, isFetching} = songs;

        return (
            <div className={'songs' + (sticky ? ' sticky' : '')}>
                <Toolbar category={category} dispatch={dispatch} sticky={sticky} />
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
    playlists: PropTypes.object.isRequired,
    songs: PropTypes.object.isRequired,
};

export default InfiniteScrollify(Stickify(Songs, 50));
