import React, {Component, PropTypes} from 'react';
import {toggleLike} from '../actions/authed';
import LoginButton from '../components/LoginButton';
import Popover from '../components/Popover';

class SongHeart extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike(e) {
    e.preventDefault();
    const {dispatch, songId} = this.props;
    dispatch(toggleLike(songId));
  }

  render() {
    const {authed, dispatch, isLiked} = this.props;
    if (!authed.user) {
        return (
          <Popover className={'song-heart ' + this.props.className}>
            <i className='icon ion-ios-heart'></i>
            <div className='song-heart-popover popover-content'>
              <LoginButton dispatch={dispatch} />
            </div>
          </Popover>
        );
      }

    return (
      <a
        className={'song-heart ' + this.props.className + (isLiked ? ' liked' : '')}
        href='#'
        onClick={this.toggleLike}>
        <i className='icon ion-ios-heart'></i>
      </a>
    );
  }
};

export default SongHeart;
