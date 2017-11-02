import React from 'react';
import { Link } from 'react-router';
import SparsenessOption from './SparsenessOption';

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
      <div className="sg-sidebar-options">
        <h2>Options</h2>
        <ul>
          <li>
            <div className="sg-sidebar-option-title">Sparseness</div>
            <div className="sg-sidebar-option-input"><SparsenessOption /></div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
