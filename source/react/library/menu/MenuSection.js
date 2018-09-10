import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  subtle: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.node.string,
};

const defaultProps = {
  subtle: false,
  className: '',
  title: '',
};

const MenuSection = ({ className, subtle, children, title }) => (
  <div
    className={classnames('rc-menu-section', className, {
      'rc-bg-subtle': subtle,
    })}
  >
    {title.length > 0 && <span className="rc-menu-section-title">{title}</span>}
    {children}
  </div>
);

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
