import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Copy from '../copy';

const propTypes = {
  /** Html element or react component to render */
  as: PropTypes.elementType,
  /** Code body */
  children: PropTypes.node,
  /** Optional additional classname. */
  className: PropTypes.string,
  /** Add Copy button to Code block */
  copyable: PropTypes.bool,
  /** Code Size */
  size: PropTypes.oneOf(['medium', 'small']),
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style: PropTypes.shape({}),
  /** Code Type */
  type: PropTypes.oneOf(['inline', 'block']),
};

const defaultProps = {
  as: 'code',
  children: '',
  className: '',
  copyable: false,
  size: 'medium',
  style: {},
  type: 'inline',
};

const Code = ({
  as: Element,
  children,
  className,
  copyable,
  size,
  style,
  type,
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
    {copyable ? <Copy>{children}</Copy> : children}
  </Element>
);

Code.propTypes = propTypes;
Code.defaultProps = defaultProps;

export default Code;
