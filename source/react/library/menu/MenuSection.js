import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: React.PropTypes.any.isRequired,
  subtle: React.PropTypes.bool,
  className: React.PropTypes.string,
};

const defaultProps = {
  subtle: false,
  className: '',
};

const MenuSection = (props) => {
  const className = classnames('rc-menu-section', props.className, {
    'rc-bg-subtle': props.subtle,
  });

  return (
    <div className={ className }>
      { props.children }
    </div>
  );
};

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
