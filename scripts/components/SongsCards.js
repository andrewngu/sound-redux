import React, {Component, PropTypes} from 'react';
import {playSong} from '../actions/player';
import {fetchSongsIfNeeded} from '../actions/playlists';
import InfiniteScrollify from '../components/InfiniteScrollify';
import SongsCard from '../components/SongsCard';
import Spinner from '../components/Spinner';

class SongsCards extends Component {
    playSong(i) {
        const {playlist, dispatch} = this.props;
        dispatch(playSong(playlist, i));
    }

    renderSongs() {
        const chunk = 5;
        const {dispatch, playlist, playlists, playingSongId, songs, users} = this.props;
        const items = playlist in playlists ? playlists[playlist].items : [];

        let result = [];
        for (let i = 0; i < items.length; i += chunk) {
            let songCards = items.slice(i, i + chunk).map((songId, j) => {
                const song = songs[songId];
                const user = users[song.user_id];
                const index = i + j;
                return (
                    <div className='col-1-5' key={index + '-' + song.id}>
                        <SongsCard
                            dispatch={dispatch}
                            isActive={song.id === playingSongId}
                            playSong={this.playSong.bind(this, index)}
                            scrollFunc={fetchSongsIfNeeded.bind(null, playlist)}
                            song={song}
                            user={user} />
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
        const {playlist, playlists} = this.props;
        const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;
        return (
            <div className='content'>
                {this.renderSongs()}
                {isFetching ? <Spinner /> : null}
            </div>
        );
    }
}

export default InfiniteScrollify(SongsCards);
