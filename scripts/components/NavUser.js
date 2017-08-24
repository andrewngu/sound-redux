import React from 'react';
import { getImageUrl } from '../utils/SongUtils';
import Popover from '../components/Popover';
import PropTypes from 'prop-types';

export default function NavUser({ authed, lastfm, onLogin, onLogout, onLastfmLogin, onLastfmLogout }) {
  const navUserLink = authed.user ?
    <div className="nav-user-link">
      <img
        alt="user avatar"
        className="nav-authed-image"
        src={getImageUrl(authed.user.avatar_url)}
      />
      <i className="icon ion-chevron-down"></i>
      <i className="icon ion-chevron-up"></i>
    </div>
  :
    <div className="nav-user-link">
      <i className="icon ion-person"></i>
      <i className="icon ion-chevron-down"></i>
      <i className="icon ion-chevron-up"></i>
    </div>;

  const navUserContent =
    (<div className="nav-user-popover popover-content">
      <ul className="nav-user-popover-list">
        {
          authed.user ?
            <li className="nav-user-popover-item">
              <a href="#" onClick={onLogout}>Log Out</a>
            </li>
          :
            <li className="nav-user-popover-item">
              <a href="#" className="button orange block" onClick={onLogin}>
                Sign into SoundCloud
              </a>
            </li>
        }
        {
          lastfm.username ?
            <li className="nav-user-popover-item">
              <a href="#" className="button lastfm block" onClick={onLastfmLogout}>Log Out from {lastfm.username}@Last.FM</a>
            </li>
          :
            <li className="nav-user-popover-item">
              <a href="#" className="button lastfm block" onClick={onLastfmLogin}>
                Connect to Last.FM
              </a>
            </li>
        }
      </ul>
    </div>);


  return (
    <Popover className="nav-user">
      {navUserLink}
      {navUserContent}
    </Popover>
    );
}

NavUser.propTypes = {
  authed: PropTypes.object.isRequired,
  lastfm: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onLastfmLogin: PropTypes.func.isRequired,
  onLastfmLogout: PropTypes.func.isRequired,
};
