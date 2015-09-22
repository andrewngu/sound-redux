import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchSongs} from '../actions/songs';
import Songs from '../components/Songs';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(fetchSongs());
    }

    render() {
        const {songs} = this.props;
        return <Songs songs={songs}  />;
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
