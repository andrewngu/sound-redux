import PropTypes from 'prop-types';
import React from 'react';
import SidebarBody from '../components/SidebarBody';
import UserFollowing from '../components/UserFollowing';

const propTypes = {
  followings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigateTo: PropTypes.func.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  sticky: PropTypes.bool.isRequired,
};

const UserFollowings = ({ followings, navigateTo, sidebarHeight, sticky }) => (
  <div
    className={`sidebar ${sticky ? 'sidebar--sticky' : ''}`}
    style={{ height: `${sidebarHeight}px` }}
  >
    <div className="sidebar__header">
      <div className="sidebar__header__left">
        {`Following ${followings.length} User${followings.length === 1 ? '' : 's'}`}
      </div>
    </div>
    <SidebarBody>
      {followings.map(following => (
        <UserFollowing
          following={following}
          key={following.id}
          navigateTo={navigateTo}
        />
      ))}
    </SidebarBody>
  </div>
);

UserFollowings.propTypes = propTypes;

export default UserFollowings;
