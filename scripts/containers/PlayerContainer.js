import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import MobilePlayer from '../components/MobilePlayer';
import Player from '../components/Player';
import {getPlayingSongId} from '../utils/PlayerUtils';

class PlayerContainer extends Component {
    render() {
        const {isMobile, playingSongId} = this.props;
        if (playingSongId === null) {
            return <div/>;
        }

        if (isMobile) {
            return <MobilePlayer {...this.props} />;
        }

        return <Player {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {entities, environment, navigator, player, playlists} = state;
    const playingSongId = getPlayingSongId(player, playlists);

    return {
        isMobile: environment.isMobile,
        player,
        playingSongId,
        playlists,
        songs: entities.songs,
        users: entities.users
    };
}

export default connect(mapStateToProps)(PlayerContainer);
