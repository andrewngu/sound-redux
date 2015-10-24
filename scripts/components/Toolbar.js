import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import Link from '../components/Link';
import {GENRES, GENRES_MAP} from '../constants/SongConstants';

class Toolbar extends Component {
    renderGenres() {
        const {dispatch, playlist} = this.props;

        return GENRES.map(genre => {
            return (
                <Link
                    className={'toolbar-item toolbar-genre' + (playlist === genre ? ' active' : '')}
                    dispatch={dispatch}
                    key={genre}
                    path={['songs']}
                    query={{q: genre}}>
                    {genre}
                </Link>
            );
        });
    }

    render() {
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
