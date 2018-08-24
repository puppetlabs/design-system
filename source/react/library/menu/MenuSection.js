import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  subtle: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  subtle: false,
  className: '',
};

const MenuSection = ({ className, subtle, children }) => (
  <div
    className={classnames('rc-menu-section', className, {
      'rc-bg-subtle': subtle,
    })}
  >
    {children}
  </div>
);

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
