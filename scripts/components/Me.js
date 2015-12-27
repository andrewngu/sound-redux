import React, {Component, PropTypes} from 'react';
import {fetchSongsIfNeeded} from '../actions/playlists';
import InfiniteScrollify from '../components/InfiniteScrollify';
import MePromptStream from '../components/MePromptStream';
import MePromptLikes from '../components/MePromptLikes';
import SongCards from '../components/SongCards';
import Stickify from '../components/Stickify';
import {AUTHED_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';

class Me extends Component {
    getPlaylist() {
        const {authedPlaylists, route} = this.props;
        const {path} = route;

        switch(path[1]) {
        case 'stream':
            return 'stream';
        case 'likes':
            return 'likes';
        case 'playlists':
            if (path.length < 3 || !(path[2] in authedPlaylists)) {
                return 'playlists';
            };
            const playlist = authedPlaylists[path[2]];
            return playlist.title;
        default:
            return 'stream';
        }
    }

    renderPrompt() {
        const {authed, dispatch, playlists} = this.props;
        switch(this.getPlaylist()) {
        case 'stream':
            return (
                <MePromptStream
                    authed={authed}
                    dispatch={dispatch} />
            );
        case 'likes':
            return (
                <MePromptLikes
                    authed={authed}
                    dispatch={dispatch}
                    playlists={playlists} />
            );
        default:
            return;
        }
    }

    render() {
        const {authed, authedPlaylists, dispatch, height, playingSongId, playlists, route, songs, sticky, users} = this.props;
        const playlist = this.getPlaylist() + AUTHED_PLAYLIST_SUFFIX;

        return (
            <div className='me'>
                {this.renderPrompt()}
                <div className='container'>
                    <SongCards
                        authed={authed}
                        dispatch={dispatch}
                        height={height}
                        playingSongId={playingSongId}
                        playlist={playlist}
                        playlists={playlists}
                        scrollFunc={fetchSongsIfNeeded.bind(null, playlist)}
                        songs={songs}
                        users={users} />
                </div>
            </div>
        );
    }
}

export default Me;
