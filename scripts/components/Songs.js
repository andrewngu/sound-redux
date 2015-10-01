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
        const {playlists, player} = this.props;
        const {activeSongIndex, selectedPlaylists} = player;
        const activePlaylist = selectedPlaylists[selectedPlaylists.length - 1];
        if (!activePlaylist || activeSongIndex === null) {
            return {};
        }

        return playlists[activePlaylist].items[activeSongIndex];
    }

    playSong(i) {
        const {dispatch, songs} = this.props;
        dispatch(playSong(songs.activePlaylist, i, songs.items));
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
                            isActive={song.id === activeSong.id}
                            playSong={this.playSong.bind(this, index)}
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
        const {dispatch, songs, playlists, sticky} = this.props;
        const {activePlaylist} = songs;
        const isFetching = activePlaylist in playlists ? playlists[activePlaylist].isFetching : false;

        return (
            <div className={'songs' + (sticky ? ' sticky' : '')}>
                <Toolbar activePlaylist={activePlaylist} dispatch={dispatch} sticky={sticky} />
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
