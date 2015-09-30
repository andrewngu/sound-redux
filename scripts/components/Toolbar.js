import React, {Component, PropTypes} from 'react';
import {changeCategory} from '../actions/songs.js';
import genres from '../constants/Genres';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    changeCategory(category) {
        if (this.props.category === category) {
            return;
        }

        this.props.dispatch(changeCategory(category));
    }

    renderGenres() {
        return genres.map((genre) => {
            return (
                <div
                    className={'toolbar-item toolbar-genre' + (this.props.category === genre ? ' active' : '')}
                    key={genre}
                    onClick={this.changeCategory.bind(this, genre)}>
                    {genre}
                </div>
            );
        });
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='container'>
                    <div className='toolbar-items'>
                        {this.renderGenres()}
                        <div className='toolbar-item toolbar-search'>
                            <input placeholder='SEARCH' type='text' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Toolbar;
