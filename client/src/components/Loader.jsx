import PropTypes from 'prop-types';
import React from 'react';

const defaultProps = {
  className: '',
};

const propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

const Loader = ({ className, isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={`loader ${className}`}>
      <div className="loader__rects">
        <div className="loader__rect loader__rect--1" />
        <div className="loader__rect loader__rect--2" />
        <div className="loader__rect loader__rect--3" />
        <div className="loader__rect loader__rect--4" />
        <div className="loader__rect loader__rect--5" />
      </div>
    </div>
  );
};

Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;

export default Loader;
