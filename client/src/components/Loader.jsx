import PropTypes from 'prop-types';
import React from 'react';

const defaultProps = {
  children: null,
  className: '',
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

const Loader = ({ children, className, isLoading }) => {
  if (isLoading) {
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
  }

  return children;
};

Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;

export default Loader;
