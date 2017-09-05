import PropTypes from 'prop-types';
import React from 'react';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { getSocialIcon, getUserLocation } from '../utils/UserUtils';

const propTypes = {
  user: PropTypes.shape({}).isRequired,
};

const UserMain = ({ user }) => {
  const { avatarUrl, description, followersCount, profiles, username } = user;

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
        </div>
        <div className="user-main__location">
          <i className="user-main__location__icon ion-location" />
          <div className="user-main__location__text">
            {getUserLocation(user)}
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
        <div className="user-main__description">
          {description}
        </div>
      </div>
    </div>
  );
};

UserMain.propTypes = propTypes;

export default UserMain;
