import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flags from '../constants/Flags'

const propTypes = {
  id: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  toggleFollow: PropTypes.func.isRequired,
};

class UserFollowButton extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { id, isFollowing, toggleFollow } = this.props;
    if (isFollowing) {
      analytics.track('Stop Follow', {id});
    } else {
      analytics.track('Start Follow', {id});
    }
    toggleFollow(id, !isFollowing);
  }

  render() {
    const { isFollowing } = this.props;

    return (
      <div
        className={`user-follow-button button button--short ${isFollowing ? 'button--red' : ''}`}
        onClick={this.onClick}
        role="button"
        tabIndex="0"
      >
        {isFollowing ? 'Following' : Flags.startFollowingWord.getValue()}
      </div>
    );
  }
}

UserFollowButton.propTypes = propTypes;

export default UserFollowButton;
