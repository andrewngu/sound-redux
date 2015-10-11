import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {playSong} from '../actions/player';

import InfiniteScrollify from '../components/InfiniteScrollify';
import SongsCard from '../components/SongsCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import Toolbar from '../components/Toolbar';


class Songs extends Component {
    constructor(props) {
        super(props);
        this.renderSongs = this.renderSongs.bind(this);
    }

    playSong(i) {
        const {activePlaylist, dispatch} = this.props;
        dispatch(playSong(activePlaylist, i));
    }

    renderSongs() {
        const chunk = 5;
        const {activePlaylist, dispatch, playlists, playingSong, songs} = this.props;
        const items = activePlaylist in playlists ? playlists[activePlaylist].items : [];

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((song, j) => {
                const index = i + j;
                return (
                    <div className='col-1-5' key={index + '-' + song.id}>
                        <SongsCard
                            dispatch={dispatch}
                            isActive={song.id === playingSong.id}
                            playSong={this.playSong.bind(this, index)}
                            song={song} />
                    </div>
                );
            }, this);

            if (songCards.length < chunk) {
                for (let j = 0; j < chunk - songCards.length + 1; j++) {
                    songCards.push(<div className='col-1-5' key={'song-placeholder-' + (i + j)}></div>);
                }
            }

            result.push(
                <div className='songs-row grid' key={'songs-row-' + i}>{songCards}</div>
            );
        }

        return result;
    }

    render() {
        const {dispatch, activePlaylist, playlists, sticky} = this.props;
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
    activePlaylist: PropTypes.string,
    playlists: PropTypes.object.isRequired,
};

export default InfiniteScrollify(Stickify(Songs, 50));
