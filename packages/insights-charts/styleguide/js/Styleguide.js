import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './partials/Sidebar';
import Editor from './partials/Editor';

const propTypes = {
  children: PropTypes.any.isRequired,
  route: PropTypes.object.isRequired,
};

const Styleguide = props => (
  <div>
    <Sidebar pages={ props.route.childRoutes } />
    <div className="sg-content">
      { props.children }
    </div>
    <Editor />
  </div>
);

Styleguide.propTypes = propTypes;

export default Styleguide;
