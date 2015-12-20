import React, {Component, PropTypes} from 'react';
import {Motion, presets, spring} from 'react-motion';
import {GENRES} from '../constants/SongConstants';
import Link from '../components/Link';

class MobileNav extends Component {
    constructor() {
        super();
        this.toggleGenreMenuOpen = this.toggleGenreMenuOpen.bind(this);
        this.state = {isGenreMenuOpen: false};
    }

    toggleGenreMenuOpen(e) {
        e.preventDefault();
        this.setState({isGenreMenuOpen : !this.state.isGenreMenuOpen});
    }

    renderGenres(playlist) {
        return GENRES
            .filter(genre => genre !== playlist)
            .map(genre =>
                <Link
                    className='mobile-nav-genre'
                    dispatch={this.props.dispatch}
                    key={genre}
                    route={{path: ['songs'], query: {q: genre}}}>
                    {genre}
                </Link>
            );
    }

    renderPlaylist() {
        const {navigator} = this.props;
        const {path, query} = navigator.route;
        const time = query && query.t ? query.t : null;
        let playlist = query && query.q ? query.q : 'house';
        if (time) {
            playlist = `${playlist} - ${time}`;
        }
        return playlist;
    }

    render() {
        const playlist = this.renderPlaylist();
        const {isGenreMenuOpen} = this.state;
        return (
            <div className='mobile-nav'>
                <Motion style={{height: spring(isGenreMenuOpen ? (GENRES.length - 1) * 50 : 0, presets.stiff)}}>
                    {({height}) =>
                        <div
                            className='mobile-nav-genres'
                            onClick={this.toggleGenreMenuOpen}
                            style={{height: height}}>
                            {this.renderGenres(playlist)}
                        </div>
                    }
                </Motion>
                <div className='mobile-nav-items'>
                    <a
                        className='mobile-nav-item'
                        href='#'
                        onClick={this.toggleGenreMenuOpen}>
                        {playlist}
                        <i className={isGenreMenuOpen ? 'ion-chevron-down' : 'ion-chevron-up'}></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default MobileNav;
