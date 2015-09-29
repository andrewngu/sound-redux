import React, {Component, PropTypes} from 'react';
import genres from '../constants/Genres';

class Toolbar extends Component {
    constructor(props) {
        super(props);
    }

    renderGenres() {
        return genres.map((genre) => {
            return (
                <div className='toolbar-item toolbar-genre' key={genre}>
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
