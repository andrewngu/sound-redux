import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Me from '../components/Me';
import {getPlayingSongId} from '../utils/PlayerUtils';

class MeContainer extends Component {
    render() {
        return <Me {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, environment, navigator, player, playlists} = state;
    const playingSongId = getPlayingSongId(player, playlists);

    return {
        authed,
        authedPlaylists: entities.playlists,
        height: environment.height,
        player,
        playingSongId,
        playlists,
        route: navigator.route,
        songs: entities.songs,
        users: entities.users
    };
}

export default connect(mapStateToProps)(MeContainer);
