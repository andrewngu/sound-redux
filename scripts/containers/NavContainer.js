import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import MobileNav from '../components/MobileNav';
import Nav from '../components/Nav';

class NavContainer extends Component {
    render() {
        const {isMobile} = this.props;
        if (isMobile) {
            return <MobileNav {...this.props} />
        }

        return <Nav {...this.props} />;
    }
}

function mapStateToProps(state) {
    const {authed, entities, environment, navigator} = state;

    return {
        authed,
        authedPlaylists: entities.playlists,
        isMobile: environment.isMobile,
        navigator,
        songs: entities.songs
    };
}

export default connect(mapStateToProps)(NavContainer);
