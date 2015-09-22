import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Songs from '../components/Songs';

class App extends Component {
    render() {
        const { songs } = this.props;
        return (
            <Songs songs={songs}  />
        );
    }
}

App.propTypes = {
    songs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { songs } = state;
    return {
        songs,
    };
}


export default connect(mapStateToProps)(App);
