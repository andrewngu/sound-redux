import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {playSong} from '../actions/player';
import {fetchSongsIfNeeded} from '../actions/playlists';

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

    componentWillMount() {
        const {dispatch, playlist} = this.props;
        dispatch(fetchSongsIfNeeded(playlist));
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, playlist, playlists} = this.props;
        if (playlist !== nextProps.playlist) {
            if (!(nextProps.playlist in playlists) || playlists[nextProps.playlist].items.length === 0) {
                dispatch(fetchSongsIfNeeded(nextProps.playlist));
            }
        }
    }

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
        const {dispatch, playlist, playlists, sticky} = this.props;
        const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

        return (
            <div className={'songs' + (sticky ? ' sticky' : '')}>
                <Toolbar playlist={playlist} dispatch={dispatch} sticky={sticky} />
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
};

export default InfiniteScrollify(Stickify(Songs, 50));
