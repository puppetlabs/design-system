import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
};

const MenuSection = (props) => {
  const className = classnames('rc-menu-section', props.className);

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

MenuSection.propTypes = propTypes;

export default MenuSection;
