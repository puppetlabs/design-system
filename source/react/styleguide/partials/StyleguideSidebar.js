import React from 'react';
import { Link } from 'react-router';

const StyleguideSidebar = () => (
  <div className="sg-sidebar">
    <ul>
      <li><Link to="/buttons">Buttons</Link></li>
      <li><Link to="/progress">Progress bars</Link></li>
      <li><Link to="/modals">Modals</Link></li>
      <li><Link to="/dropdowns">Dropdowns</Link></li>
      <li><Link to="/forms">Forms</Link></li>
      <li><Link to="/cards">Cards</Link></li>
      <li><Link to="/icons">Icons</Link></li>
      <li><Link to="/switches">Switches</Link></li>
      <li><Link to="/tabs">Tabs</Link></li>
      <li><Link to="/tooltips">Tooltips</Link></li>
      <li><Link to="/toggles">Toggles</Link></li>
      <li><Link to="/tables">Tables</Link></li>
      <li><Link to="/slideins">Slide Ins</Link></li>
      <li><Link to="/accordions">Accordions</Link></li>
      <li><Link to="/blankslates">Blank Slates</Link></li>
    </ul>
  </div>
);

export default StyleguideSidebar;
