import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import Popover from '../components/Popover';

const PATHS = ['stream', 'likes'];

class MeToolbar extends Component {
    renderArtworks(playlist) {
        const {songs} = this.props;
        return playlist.tracks.slice(0, 10).map(songId =>
            <img className='toolbar-playlist-image' key={songId} src={songs[songId].artwork_url} />
        );
    }

    renderItems() {
        const {dispatch, route} = this.props;
        return PATHS.map(path =>
            <Link
                className={'toolbar-item toolbar-genre' + (path === route.path[1] ? ' active' : '')}
                dispatch={dispatch}
                key={path}
                route={{path: ['me', path]}}>
                {path}
            </Link>
        );
    }

    renderPlaylists() {
        const {authed, authedPlaylists, dispatch} = this.props;
        return authed.playlists.map(playlistId => {
            const playlist = authedPlaylists[playlistId];
            return (
                <Link
                    className='toolbar-playlist'
                    dispatch={dispatch}
                    key={playlistId}
                    route={{path: ['me', 'playlists', playlistId]}}>
                    <div className='toolbar-playlist-title'>
                        {`${playlist.title} (${playlist.track_count})`}
                    </div>
                    {this.renderArtworks(playlist)}
                </Link>
            );
        });
    }

    render() {
        const {playlist, route} = this.props;
        const {path} = route;
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderItems()}
                        <Popover className={'toolbar-playlists toolbar-item toolbar-genre bottom-left' + (path[1] === 'playlists' ? ' active' : '')}>
                            <div>
                                <span>{path[1] === 'playlists' ? playlist : 'playlists'}</span>
                                <i className='icon ion-chevron-down'></i>
                                <i className='icon ion-chevron-up'></i>
                            </div>
                            <div className='toolbar-popover popover-content'>
                                {this.renderPlaylists()}
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}

export default MeToolbar;
