import React from 'react';
import Sidebar from './partials/Sidebar';

const propTypes = {
  children: React.PropTypes.any.isRequired,
};

const Styleguide = props => (
  <div>
    <Sidebar />
    <div className="sg-content">
      { props.children }
    </div>
  </div>
);

Styleguide.propTypes = propTypes;

export default Styleguide;
