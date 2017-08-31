import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  router: PropTypes.shape({
    route: PropTypes.shape({
      path: PropTypes.string,
    }),
  }).isRequired,
  routes: PropTypes.shape({}).isRequired,
};

const Router = ({ router, routes }) => {
  const { path } = router.route;
  if (path in routes) {
    return React.createElement(routes[path]);
  }

  return null;
};

Router.propTypes = propTypes;

export default Router;
