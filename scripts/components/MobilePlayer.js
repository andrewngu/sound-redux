import React, {Component, PropTypes} from 'react';
import {VelocityComponent} from 'velocity-react';
import MobilePlayerContent from '../components/MobilePlayerContent';

class MobilePlayer extends Component {
    renderPlayerContent() {
        const {playingSongId} = this.props;
        if (playingSongId === null) {
            return <div></div>;
        }

        return <MobilePlayerContent {...this.props} />;
    }

    render() {
        const {playingSongId} = this.props;
        const isSongPlaying = playingSongId !== null;
        return (
            <VelocityComponent animation={{ height: isSongPlaying ? 100 : 0 }} duration={250}>
                {this.renderPlayerContent()}
            </VelocityComponent>
        );
    }
}

export default MobilePlayer;
