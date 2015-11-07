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
    const {authed, entities, height, navigator, player, playlists} = state;
    const playingSongId = getPlayingSongId(player, playlists);

    return {
        authed,
        authedPlaylists: entities.playlists,
        height,
        player,
        playingSongId,
        playlists,
        route: navigator.route,
        songs: entities.songs,
        users: entities.users
    };
}

export default connect(mapStateToProps)(MeContainer);
