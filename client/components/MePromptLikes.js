import React, { Component, PropTypes } from 'react';
import { removeUnlikedSongsPre } from '../actions/PlaylistsActions';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`;
const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  playlists: PropTypes.object.isRequired,
};

class MePromptLikes extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch(removeUnlikedSongsPre());
  }

  renderLikesPrompt() {
    const { authed, playlists } = this.props;
    const { items } = playlists[LIKES_PLAYLIST_KEY];
    const likedItems = Object.keys(authed.likes)
      .filter(songId => authed.likes[songId] === 1);

    const countDiff = items.length - likedItems.length;
    if (countDiff === 0) {
      return null;
    }

    return (
      <a className="me-prompt-link" href="#" onClick={this.handleClick}>
        {`Remove ${countDiff} unliked song${(countDiff === 1 ? '' : 's')}`}
      </a>
    );
  }

  render() {
    return (
      <div className="me-prompt">
        {this.renderLikesPrompt()}
      </div>
    );
  }
}

MePromptLikes.propTypes = propTypes;

export default MePromptLikes;
