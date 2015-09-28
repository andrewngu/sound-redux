import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongsIfNeeded} from '../actions/songs';

import Header from '../components/Header';
import SongPlayer from '../components/SongPlayer';
import Songs from '../components/Songs';

class App extends Component {
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(fetchSongsIfNeeded());
    }

    renderSongPlayer() {
        const {dispatch, songs} = this.props;
        if (songs.activeSongIndex === null) {
            return;
        }

        return <SongPlayer dispatch={dispatch} song={songs.items[songs.activeSongIndex]} />
    }

    render() {
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='content'>
                        <Songs {...this.props} scrollFunc={fetchSongsIfNeeded} />
                    </div>
                </div>
                {this.renderSongPlayer()}
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
