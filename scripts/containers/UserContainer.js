import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import User from '../components/User';
import {getPlayingSongId} from '../utils/PlayerUtils';

class UserContainer extends Component {
    render() {
        return <User {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, environment, navigator, player, playlists} = state;
    const {path, query} = navigator.route;
    const userId = parseInt(path[1]);
    const playingSongId = getPlayingSongId(player, playlists);

    return {
        authed,
        height: environment.height,
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        userId,
        users: entities.users
    };
}

export default connect(mapStateToProps)(UserContainer);
