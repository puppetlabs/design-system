import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  as: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  as: 'a',
  className: '',
  children: null,
};

const Link = ({ as, className, children, ...rest }) => {
  const Element = as;

  return (
    <Element className={classNames('rc-link', className)} {...rest}>
      {children}
    </Element>
  );
};

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
