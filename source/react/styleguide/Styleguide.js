import React from 'react';
import Sidebar from './partials/Sidebar';

const propTypes = {
  children: React.PropTypes.any,
};

const Styleguide = props => (
  <div>
    <Sidebar />
    <div className="content">
      { props.children }
    </div>
  </div>
);

Styleguide.propTypes = propTypes;

export default Styleguide;
