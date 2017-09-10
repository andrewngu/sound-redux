import PropTypes from 'prop-types';
import React from 'react';
import LoginPopoverPanel from '../components/LoginPopoverPanel';
import SessionPopoverPanel from '../components/SessionPopoverPanel';
import Popover from '../components/Popover';
import getImageUrl from '../utils/ImageUtils';

const defaultProps = {
  user: null,
};

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

const NavUser = ({ isAuthenticated, login, logout, user }) => {
  if (isAuthenticated) {
    const { avatarUrl } = user;
    return (
      <Popover className="nav-user popover--right">
        <div className="nav-user__trigger">
          <div
            className="nav-user__avatar"
            style={{ backgroundImage: `url(${getImageUrl(avatarUrl)})` }}
          />
          <i className="nav-user__chevron ion-chevron-down" />
        </div>
        <SessionPopoverPanel logout={logout} />
      </Popover>
    );
  }

  return (
    <Popover className="nav-user popover--right">
      <div className="nav-user__trigger">
        <i className="nav-user__icon ion-person" />
        <i className="nav-user__chevron ion-chevron-down" />
      </div>
      <LoginPopoverPanel login={login} />
    </Popover>
  );
};

NavUser.defaultProps = defaultProps;
NavUser.propTypes = propTypes;

export default NavUser;
