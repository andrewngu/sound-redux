import React, { Component, PropTypes } from 'react';
import { loginUser, toggleLike } from '../actions/AuthedActions';
import Popover from '../components/Popover';
import { addCommas } from '../utils/FormatUtils';

const propTypes = {
  authed: PropTypes.object,
  className: PropTypes.string,
  count: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  songId: PropTypes.number,
};

class SongHeartCount extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  login() {
    const { dispatch } = this.props;
    dispatch(loginUser(false));
  }

  toggleLike() {
    const { dispatch, songId } = this.props;
    dispatch(toggleLike(songId));
  }

  render() {
    const { authed, className, count, songId } = this.props;
    const isLiked = songId in authed.likes && authed.likes[songId];

    if (!authed.user) {
      return (
        <Popover className={`song-list-item-stat song-heart-count ${className}`}>
          <div>
            <i className="icon ion-ios-heart" />
            <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
          </div>
          <div className="song-heart-count-popover popover-content">
            <ul className="nav-user-popover-list">
              <li className="nav-user-popover-item">
                <a className="button orange block" onClick={this.login}>
                  Sign into SoundCloud
                </a>
              </li>
            </ul>
          </div>
        </Popover>
      );
    }

    return (
      <div
        className={`song-list-item-stat song-heart-count ${(isLiked ? ' liked' : '')}`}
        onClick={this.toggleLike}
      >
        <i className="icon ion-ios-heart" />
        <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
      </div>
    );
  }
}

SongHeartCount.propTypes = propTypes;

export default SongHeartCount;
