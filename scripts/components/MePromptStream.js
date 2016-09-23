import React, { Component, PropTypes } from 'react';
import { addNewStreamSongsToPlaylist } from '../actions/AuthedActions';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

class MePromptStream extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(addNewStreamSongsToPlaylist());
  }

  renderUpdatesPrompt() {
    const { newStreamSongs } = this.props.authed;
    const newStreamSongsLen = newStreamSongs.length;
    if (newStreamSongsLen === 0) {
      return null;
    }

    return (
      <a className="me-prompt-link" href="#" onClick={this.handleClick}>
        {`Load ${newStreamSongsLen} new song${(newStreamSongsLen !== 1 ? 's' : '')}`}
      </a>
    );
  }

  render() {
    return (
      <div className="me-prompt">
        {this.renderUpdatesPrompt()}
      </div>
    );
  }
}

MePromptStream.propTypes = propTypes;

export default MePromptStream;
