import React, {Component, PropTypes} from 'react';
import {changeActivePlaylist} from '../actions/playlists';
import {GENRES, GENRES_MAP} from '../constants/SongConstants';

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    changeActivePlaylist(playlist) {
        const {activePlaylist, dispatch} = this.props;
        if (activePlaylist === playlist) {
            return;
        }

        dispatch(changeActivePlaylist(playlist));
    }

    handleOnKeyPress(e) {
        if (e.charCode === 13) {
            const value = e.currentTarget.value.trim();
            if (value !== '') {
                this.props.dispatch(changeActivePlaylist(value));
            }
        }
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
                        <div className={'toolbar-item toolbar-search' + (activePlaylist in GENRES_MAP ? '' : ' active')}>
                            <input placeholder='SEARCH' onKeyPress={this.handleOnKeyPress} type='text' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
