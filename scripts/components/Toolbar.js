import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import Link from '../components/Link';
import {GENRES, GENRES_MAP} from '../constants/SongConstants';

const DAYS = [30, 60, 90];

class Toolbar extends Component {
    renderGenres() {
        const {dispatch, playlist, time} = this.props;
        const genre = playlist.split(' - ')[0];

        return GENRES.map(g => {
            return (
                <Link
                    className={'toolbar-item toolbar-genre' + (g === genre ? ' active' : '')}
                    dispatch={dispatch}
                    key={g}
                    path={['songs']}
                    query={{q: g, t: time}}>
                    {g}
                </Link>
            );
        });
    }

    renderTimes() {
        const {dispatch, playlist, time} = this.props;
        const genre = playlist.split(' - ')[0];

        return DAYS.map(t => {
            return (
                <Link
                    className={'toolbar-time' + (t === time ? ' active' : '')}
                    dispatch={dispatch}
                    key={t}
                    path={['songs']}
                    query={{q: genre, t: (t === time ? null : t)}}>
                    {`${t} days`}
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
                        <div className='toolbar-item toolbar-filter toolbar-times'>
                            <i className='icon ion-funnel'></i>
                            {this.renderTimes()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
