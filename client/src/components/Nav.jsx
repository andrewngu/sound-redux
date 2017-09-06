import PropTypes from 'prop-types';
import React from 'react';
import Link from '../components/Link';
import NavSearch from '../components/NavSearch';
import NavUser from '../components/NavUser';
import { SONGS_PATH } from '../constants/RouterConstants';

const defaultProps = {
  user: null,
};

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  user: PropTypes.shape({}),
};

const Nav = ({ isAuthenticated, login, logout, navigateTo, user }) => (
  <div className="nav">
    <div className="nav__inner container">
      <div className="nav__section">
        <i className="nav__logo__icon ion-radio-waves" />
        <Link
          className="nav__logo__text"
          navigateTo={navigateTo}
          path={SONGS_PATH}
        >
          SoundRedux
        </Link>
      </div>
      <div className="nav__section nav__section--flex" />
      <div className="nav__section">
        <NavSearch navigateTo={navigateTo} />
      </div>
      <div className="nav__section">
        <NavUser
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}
          user={user}
        />
      </div>
    </div>
  </div>
);

Nav.defaultProps = defaultProps;
Nav.propTypes = propTypes;

export default Nav;
