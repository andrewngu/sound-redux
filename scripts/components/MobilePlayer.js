import React, {Component, PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
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
            <Motion style={{height: spring(isSongPlaying ? 100 : 0)}}>
                {({height}) =>
                    <div className='mobile-player-container' style={{height: height}}>
                        {this.renderPlayerContent()}
                    </div>
                }
            </Motion>
        );
    }
}

export default MobilePlayer;
