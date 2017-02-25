import React from 'react';

const propTypes = {
  children: React.PropTypes.any,
};

const MenuSection = props => (
  <div className="rc-menu-section">
    { props.children }
  </div>
);

MenuSection.propTypes = propTypes;

export default MenuSection;
