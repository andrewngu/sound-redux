import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Player from '../components/Player';
import {getPlayingSongId} from '../utils/PlayerUtils';

class PlayerContainer extends Component {
    render() {
        if (!this.props.playingSongId) {
            return <div/>;
        }

        return <Player {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {entities, navigator, player, playlists} = state;
    const playingSongId = getPlayingSongId(player, playlists);

    return {
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        users: entities.users
    };
}

export default connect(mapStateToProps)(PlayerContainer);
