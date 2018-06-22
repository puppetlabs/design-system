import React from 'react';
import { Link } from 'react-router';

const propTypes = {
  pages: React.PropTypes.array,
};

const defaultProps = {
  pages: [],
};

const Sidebar = ({ pages }) => {
  const lis = pages.map(p => (
    <li key={ p.path }>
      <Link
        to={ `/${p.path}` }
        className="sg-sidebar-link"
        activeClassName="sg-sidebar-link-active"
      >
        { p.name }
      </Link>
    </li>
  ));

  return (
    <div className="sg-sidebar">
      <ul className="sg-sidebar-links">
        { lis }
      </ul>
    </div>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
