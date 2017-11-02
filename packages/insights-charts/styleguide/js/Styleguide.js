import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './partials/Sidebar';

const propTypes = {
  children: PropTypes.any.isRequired,
};

const Styleguide = props => (
  <div>
    <Sidebar pages={ props.route.childRoutes } />
    <div className="sg-content">
      { props.children }
    </div>
  </div>
);

Styleguide.propTypes = propTypes;

export default Styleguide;
