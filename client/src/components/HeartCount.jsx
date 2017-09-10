import PropTypes from 'prop-types';
import React from 'react';
import { addCommas } from '../utils/NumberUtils';

const defaultProps = {
  favoritingsCount: null,
};

const propTypes = {
  favoritingsCount: PropTypes.number,
};

const HeartCount = ({ favoritingsCount }) => {
  if (favoritingsCount) {
    return (
      <div className="heart__count">
        {addCommas(favoritingsCount)}
      </div>
    );
  }

  return null;
};

HeartCount.defaultProps = defaultProps;
HeartCount.propTypes = propTypes;

export default HeartCount;
