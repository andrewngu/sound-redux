import React, {Component, PropTypes} from 'react';
import {addNewStreamSongsToPlaylist} from '../actions/authed';

class MePromptStream extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const {dispatch} = this.props;
        e.preventDefault();
        dispatch(addNewStreamSongsToPlaylist());
    }

    renderUpdatesPrompt() {
        const {newStreamSongs} = this.props.authed;
        const newStreamSongsLen = newStreamSongs.length;
        if (newStreamSongsLen === 0) {
            return;
        }

        return (
            <a className='me-prompt-link' href='#' onClick={this.handleClick}>
                {'Load ' + newStreamSongsLen + ' new song' + (newStreamSongsLen !== 1 ? 's' : '')}
            </a>
        );
    }

    render() {
        return (
            <div className='me-prompt'>
                {this.renderUpdatesPrompt()}
            </div>
        );
    }
}

MePromptStream.propTypes = {
    authed: PropTypes.object.isRequired
};

export default MePromptStream;
