import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li><Link to="/buttons">Buttons</Link></li>
      <li><Link to="/modals">Modals</Link></li>
      <li><Link to="/forms">Forms</Link></li>
      <li><Link to="/cards">Cards</Link></li>
      <li><Link to="/icons">Icons</Link></li>
      <li><Link to="/switches">Switches</Link></li>
      <li><Link to="/tabs">Tabs</Link></li>
    </ul>
  </div>
);

export default Sidebar;
