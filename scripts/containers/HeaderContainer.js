import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';

class HeaderContainer extends Component {
    render() {
        return <Header {...this.props} />;
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

export default connect(mapStateToProps)(HeaderContainer);
