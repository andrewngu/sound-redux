import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import Link from '../components/Link';
import Popover from '../components/Popover';
import {GENRES, GENRES_MAP} from '../constants/SongConstants';

const DAYS = [7, 30, 90];

class Toolbar extends Component {
    renderGenres() {
        const {dispatch, playlist, time} = this.props;
        const genre = playlist.split(' - ')[0];
        let genre_query_format = "";

        return GENRES.map(g => {
            genre_query_format = g.split(' ').join('');
            const route = {
                path: ['songs'],
                query: {
                    q: genre_query_format,
                    t: time
                }
            };

            return (
                    <li className='nav-user-popover-item'>
                    <Link
                        className={' toolbar-button' + (g === genre ? ' active' : '') + ' '}
                        dispatch={dispatch}
                        key={g}
                        route={route}>
                        {g}

                    </Link>
                    

                    </li>

            );
        });
    }

    renderTimes() {
        const {dispatch, playlist, time} = this.props;
        const genre = playlist.split(' - ')[0];

        return DAYS.map(t => {
            const route = {
                path: ['songs'],
                query: {
                    q: genre,
                    t: (t === time ? null : t)
                }
            };

            return (
                <li className='nav-user-popover-item'>
                <Link
                    className={'toolbar-button' + (t === time ? ' active' : '')}
                    dispatch={dispatch}
                    key={t}
                    route={route}>
                    {`${t} days`}
                </Link>
                                    
                </li>
            );
        });
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        <Popover >
                            <div className='toolbar-item toolbar-button'>
                                <i className='toolbar-item ion-android-search'> </i>
                                <span>Search Genres</span>
                             </div>
                             <div className='nav-user-popover popover-content toolbar-menu'>
                                <ul className='nav-user-popover-list '>
                                 {this.renderGenres()} 
                                </ul>
                            </div>
                        </Popover>
                        <Popover >
                            <div className='toolbar-item toolbar-button'>
                                <i className='toolbar-item ion-android-time'> </i>
                                <span>Since</span>
                             </div>
                             <div className='nav-user-popover popover-content toolbar-menu'>
                                <ul className='nav-user-popover-list'>
                                {this.renderTimes()}
                                </ul>
                            </div>
                        </Popover>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;


