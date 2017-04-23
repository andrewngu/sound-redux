import React, { Component, PropTypes } from 'react';
import Link from '../components/Link';
import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { getUserLocation } from '../utils/UserUtils';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

class UserCard extends Component {
  render() {
    const { dispatch, user } = this.props;

    return (
      <div className="user-card">
        <img
          alt="user avatar"
          className="user-card-image"
          src={getImageUrl(user.avatar_url)}
        />
        <div className="user-card-info">
          <Link
            className="user-card-title"
            dispatch={dispatch}
            route={{ path: ['users', user.id] }}
          >
            {user.username}
          </Link>
          <div className="user-card-subtitle">
            <i className="icon ion-location" />
            {getUserLocation(user)}
          </div>
        </div>
        <div className="user-card-followers">
          <div className="user-card-followers-count">
            {addCommas(user.followers_count)}
          </div>
          <div className="user-card-subtitle">
            Followers
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = propTypes;

export default UserCard;
