import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './partials/Sidebar';
import Editor from './partials/Editor';

const propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.shape({}).isRequired,
};

const Styleguide = props => {
  const { route, children } = props;

  return (
    <div>
      <Sidebar pages={route.childRoutes} />
      <div className="sg-content">{children}</div>
      <Editor />
    </div>
  );
};

Styleguide.propTypes = propTypes;

export default Styleguide;
