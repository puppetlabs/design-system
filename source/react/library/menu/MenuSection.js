import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.any.isRequired,
  subtle: PropTypes.bool,
  className: PropTypes.string,
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
