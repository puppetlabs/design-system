import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  color: PropTypes.oneOf(['subtle', 'medium']),
  hero: PropTypes.bool,
};

const defaultProps = {
  as: 'h1',
  className: '',
  color: null,
  hero: false,
};

const Heading = props => {
  const { children, as, className, color, hero, ...others } = props;
  const classNames = classnames(
    'rc-heading',
    {
      'rc-heading-hero': hero,
      [`rc-heading-${as}`]: as && !hero ? as : false,
      [`rc-heading-${color}`]: color,
    },
    className,
  );

  /**
   * JSX requires element names to be capitalized if they are referenced as variables
   */
  const Component = as;

  return (
    <Component className={classNames} {...others}>
      {children}
    </Component>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
