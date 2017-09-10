import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import { USER_PATH } from '../constants/RouterConstants';
import { addCommas } from '../utils/NumberUtils';
import getImageUrl from '../utils/ImageUtils';
import { getLocation } from '../utils/UserUtils';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
  following: PropTypes.shape({}).isRequired,
};

const UserFollowing = ({ following, navigateTo }) => {
  const { avatarUrl, followersCount, id, username } = following;

  return (
    <div className="user-following">
      <div
        className="user-following__avatar"
        style={{ backgroundImage: `url(${getImageUrl(avatarUrl)})` }}
      />
      <div className="user-following__main">
        <Link
          className="user-following__username"
          keys={{ id }}
          navigateTo={navigateTo}
          path={USER_PATH}
        >
          {username}
        </Link>
        <div className="user-following__location">
          <i className="user-following__location__icon ion-location" />
          <div className="user-following__location__text">
            {getLocation(following)}
          </div>
        </div>
      </div>
      <div className="user-following__followers">
        <div className="user-following__followers__count">
          {addCommas(followersCount)}
        </div>
        <div className="user-following__followers__text">
          Followers
        </div>
      </div>
    </div>
  );
};

UserFollowing.propTypes = propTypes;

export default UserFollowing;
