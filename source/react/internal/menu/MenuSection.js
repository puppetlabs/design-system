import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  subtle: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  padding: PropTypes.bool,
};

const defaultProps = {
  subtle: false,
  className: '',
  title: '',
  padding: false,
};

const MenuSection = ({ className, subtle, padding, children, title }) => (
  <div
    className={classnames('rc-menu-section', className, {
      'rc-menu-subtle': subtle,
      'rc-menu-section-padding': padding,
    })}
  >
    {title.length > 0 && <span className="rc-menu-section-title">{title}</span>}
    {children}
  </div>
);

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
