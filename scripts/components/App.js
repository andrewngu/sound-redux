import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongs} from '../actions/songs';

import Header from '../components/Header';
import Songs from '../components/Songs';

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(fetchSongs());
    }

    render() {
        const {songs} = this.props;
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='content'>
                        <Songs songs={songs} />
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    songs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { songs } = state;
    return {
        songs,
    };
}


export default connect(mapStateToProps)(App);
