import React, {Component, PropTypes} from 'react';
import {toggleLike} from '../actions/authed';
import LoginButton from '../components/LoginButton';
import Popover from '../components/Popover';
import {addCommas} from '../utils/FormatUtils';

class SongHeartCount extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike() {
    const {dispatch, songId} = this.props;
    dispatch(toggleLike(songId));
  }

  render() {
    const {authed, count, dispatch, songId} = this.props;
    const isLiked = songId in authed.likes && authed.likes[songId];

    if (!authed.user) {
      return (
        <Popover className={'song-list-item-stat song-heart-count ' + this.props.className}>
          <div>
            <i className='icon ion-ios-heart'></i>
            <span>{addCommas(count)}</span>
          </div>
          <div className='song-heart-count-popover popover-content'>
            <LoginButton dispatch={dispatch} />
          </div>
        </Popover>
      );
    }

    return (
      <div
        className={'song-list-item-stat song-heart-count' + (isLiked ? ' liked' : '')}
        onClick={this.toggleLike}>
        <i className='icon ion-ios-heart'></i>
        <span>{addCommas(count + (isLiked ? 1 : 0))}</span>
      </div>
    );
  }
};

export default SongHeartCount;
