import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Code Size */
  size: PropTypes.oneOf(['medium', 'small']),
  /** Code Type */
  type: PropTypes.oneOf(['inline', 'block']),
  /** Code body */
  children: PropTypes.node,
  /** Optional additional classname. */
  className: PropTypes.string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style: PropTypes.shape({}),
};

const defaultProps = {
  as: 'code',
  type: 'inline',
  children: '',
  className: '',
  size: 'medium',
  style: {},
};

const Code = ({
  as: Element,
  size,
  type,
  children,
  className,
  style,
  ...other
}) => (
  <Element
    className={classNames(
      'rc-code',
      `rc-code-${type}`,
      {
        [`rc-code-size-${size}`]: size,
      },
      className,
    )}
    style={style}
    {...other}
  >
    {children}
  </Element>
);

Code.propTypes = propTypes;
Code.defaultProps = defaultProps;

export default Code;
