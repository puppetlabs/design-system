import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { renderableElement } from '../../helpers/customPropTypes';

const propTypes = {
  /** Html element or react component to render */
  as: renderableElement,
  /** Text Size */
  size: PropTypes.oneOf(['medium', 'small', 'tiny']),
  /** Text color */
  color: PropTypes.oneOf(['subtle', 'medium', 'danger', 'warning', 'success']),
  /** Text body */
  children: PropTypes.node,
  /** Optional additional classname. */
  className: PropTypes.string,
  /** Optional inline style. Additionally, other event handlers and and props are propagated to the inner element for use as needed */
  style: PropTypes.shape({}),
};

const defaultProps = {
  as: 'div',
  children: '',
  className: '',
  size: 'medium',
  color: null,
  style: {},
};

const Text = ({ as: Element, size, color, children, className, ...other }) => (
  <Element
    className={classNames(
      'rc-text',
      {
        [`rc-text-size-${size}`]: size,
        [`rc-text-${color}`]: color,
      },
      className,
    )}
    {...other}
  >
    {children}
  </Element>
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
