import PropTypes from 'prop-types';
import React from 'react';
import Popover from '../components/Popover';
import HeartPopoverPanel from '../components/HeartPopoverPanel';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  login: PropTypes.func.isRequired,
};

const HeartPopover = ({ className, login }) => (
  <Popover className={className} renderPanel={() => <HeartPopoverPanel login={login} />}>
    <i className="heart ion-ios-heart" />
  </Popover>
);

HeartPopover.defaultProps = defaultProps;
HeartPopover.propTypes = propTypes;

export default HeartPopover;
