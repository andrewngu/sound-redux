import React, {Component, PropTypes} from 'react';
import {changeActivePlaylist} from '../actions/playlists';
import {GENRES, GENRES_MAP} from '../constants/SongConstants';

class Toolbar extends Component {
    changeActivePlaylist(playlist) {
        const {activePlaylist, dispatch} = this.props;
        if (activePlaylist === playlist) {
            return;
        }

        dispatch(changeActivePlaylist(playlist));
    }

    renderGenres() {
        const {activePlaylist} = this.props;

        return GENRES.map(genre => {
            return (
                <div
                    className={'toolbar-item toolbar-genre' + (activePlaylist === genre ? ' active' : '')}
                    key={genre}
                    onClick={this.changeActivePlaylist.bind(this, genre)}>
                    {genre}
                </div>
            );
        });
    }

    render() {
        const {activePlaylist} = this.props;

        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderGenres()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
