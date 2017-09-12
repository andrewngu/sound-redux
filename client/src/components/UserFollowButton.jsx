import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
        {isFollowing ? 'Following' : 'Follow'}
      </div>
    );
  }
}

UserFollowButton.propTypes = propTypes;

export default UserFollowButton;
