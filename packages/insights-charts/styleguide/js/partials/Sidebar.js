import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => (
  <div className="sg-sidebar">
    <ul>
      <li><Link to="/line-charts">Line Charts</Link></li>
    </ul>
  </div>
);

export default Sidebar;
