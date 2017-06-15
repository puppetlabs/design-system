import React from 'react';
import { Link } from 'react-router';

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
      <ul>
        { lis }
      </ul>
    </div>
  );
}

export default Sidebar;
