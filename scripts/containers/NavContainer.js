import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Nav from '../components/Nav';

class NavContainer extends Component {
    render() {
        return <Nav {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, navigator} = state;

    return {
        authed,
        authedPlaylists: entities.playlists,
        navigator,
        songs: entities.songs
    };
}

export default connect(mapStateToProps)(NavContainer);
