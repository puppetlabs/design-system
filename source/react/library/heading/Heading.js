import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  style: PropTypes.oneOfType(['subtle', 'medium']),
};

const defaultProps = {
  children: '',
  as: 'h1',
};

const Heading = (props) => {
  const { children, as, className, style, ...others } = props;
  const classNames = classnames('rc-heading', className, {
    [`rc-heading-${as}`]: as,
    [`rc-heading-${style}`]: style,
  });

  /**
   * JSX requires element names to be capitalized if they are referenced as variables
   */
  const Component = as;

  return (
    <Component
      className={ classNames }
      { ...others }
    >
      {children}
    </Component>
  );
};

Heading.propTypes = propTypes;
Heading.defaultProps = defaultProps;

export default Heading;
