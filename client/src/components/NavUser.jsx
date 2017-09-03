import PropTypes from 'prop-types';
import React from 'react';
import LoginPopoverPanel from '../components/LoginPopoverPanel';
import Popover from '../components/Popover';

const propTypes = {
  login: PropTypes.func.isRequired,
};

const NavUser = ({ login }) => (
  <Popover
    className="nav-user popover--right"
    renderPanel={() => <LoginPopoverPanel login={login} />}
  >
    <div className="nav-user__trigger">
      <i className="nav-user__icon ion-person" />
      <i className="nav-user__chevron ion-chevron-down" />
    </div>
  </Popover>
);

NavUser.propTypes = propTypes;

export default NavUser;
