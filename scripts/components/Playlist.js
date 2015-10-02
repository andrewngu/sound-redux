import React, {Component, PropTypes} from 'react';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {activePlaylistIndex: null};
    }

    changeActivePlaylistIndex(i) {
        const {player} = this.props;
        const {selectedPlaylists} = player;
        if (i < 0 || i >= selectedPlaylists.length) {
            return;
        }
        this.setState({activePlaylistIndex: i});
    }

    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    render() {
        const {playlists, player} = this.props;
        const {selectedPlaylists} = player;
        const activePlaylistIndex = this.state.activePlaylistIndex !== null ? this.state.activePlaylistIndex : selectedPlaylists.length - 1;
        const activePlaylist = selectedPlaylists[activePlaylistIndex];
        const songs = playlists[activePlaylist].items.map(song => {
            return (
                <li className='playlist-song' key={song.id}>
                    <img className='playlist-song-image' src={song.artwork_url} />
                </li>
            );
        });

        return (
            <div
                className='popover-content playlist'
                onClick={e => e.stopPropagation() }
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                <div className='playlist-header'>
                    <a
                        className={'playlist-header-button' + (activePlaylistIndex === 0 ? ' disabled' : '')}
                        onClick={this.changeActivePlaylistIndex.bind(this, activePlaylistIndex - 1)}>
                        <i className='icon ion-ios-arrow-back'></i>
                    </a>
                    <div className='playlist-header-title'>{activePlaylist}</div>
                    <a
                        className={'playlist-header-button' + (activePlaylistIndex === selectedPlaylists.length - 1 ? ' disabled' : '')}
                        onClick={this.changeActivePlaylistIndex.bind(this, activePlaylistIndex + 1)}>
                        <i className='icon ion-ios-arrow-forward'></i>
                    </a>
                </div>
                <div className='playlist-body'>
                    <ul className='playlist-songs'>{songs}</ul>
                </div>
                <div className='playlist-footer'>{songs.length + (songs.length === 1 ? ' Song' : ' Songs')}</div>
            </div>
        );
    }
}

Playlist.propTypes = {
    dispatch: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    playlists: PropTypes.object.isRequired
};

export default Playlist;
