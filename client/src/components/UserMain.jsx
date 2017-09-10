import PropTypes from 'prop-types';
import React from 'react';
import UserFollowButton from '../components/UserFollowButton';
import IMAGE_SIZES from '../constants/ImageConstants';
import { addCommas } from '../utils/NumberUtils';
import getImageUrl from '../utils/ImageUtils';
import { getSocialIcon, getLocation } from '../utils/UserUtils';

const propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleFollow: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
};

const UserMain = ({ isFollowing, profiles, toggleFollow, user }) => {
  const { avatarUrl, description, followersCount, username } = user;

  return (
    <div className="user-main">
      <div className="user-main__avatar">
        <div
          className="user-main__avatar__image"
          style={{ backgroundImage: `url(${getImageUrl(avatarUrl, IMAGE_SIZES.LARGE)})` }}
        />
      </div>
      <div className="user-main__main">
        <div className="user-main__title">
          <div className="user-main__username">
            {username}
          </div>
          <div className="user-main__button">
            <UserFollowButton
              id={user.id}
              isFollowing={isFollowing}
              toggleFollow={toggleFollow}
            />
          </div>
        </div>
        <div className="user-main__location">
          <i className="user-main__location__icon ion-location" />
          <div className="user-main__location__text">
            {getLocation(user)}
          </div>
        </div>
        <div className="user-main__meta">
          <div className="user-main__followings">
            <div className="user-main__followings__count">
              {addCommas(followersCount)}
            </div>
            <div className="user-main__followings__text">
              Followers
            </div>
          </div>
          {profiles.map(({ id, service, title, url }) => (
            <div className="user-main__profile" key={id}>
              <i className={`user-main__profile__icon ${getSocialIcon(service)}`} />
              <a className="user-main__profile__text" href={url} target="_blank">
                {title || service}
              </a>
            </div>
          ))}
        </div>
        <div
          className="user-main__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

UserMain.propTypes = propTypes;

export default UserMain;
