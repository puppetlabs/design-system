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
    className={classnames('rc-menu-deprecatedsection', className, {
      'rc-menu-deprecatedsubtle': subtle,
      'rc-menu-deprecatedsection-padding': padding,
    })}
  >
    {title.length > 0 && <span className="rc-menu-deprecatedsection-title">{title}</span>}
    {children}
  </div>
);

MenuSection.propTypes = propTypes;
MenuSection.defaultProps = defaultProps;

export default MenuSection;
