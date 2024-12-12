import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { elementElevation } from '../../helpers/customPropTypes';
import Button from '../button';

const propTypes = {
  /** Optional additional className */
  className: PropTypes.string,
  /** Function to call when the close button is clicked */
  onClose: PropTypes.func,
  /** Component children */
  children: PropTypes.node,
  /** Side the arrow appears on */
  side: PropTypes.oneOf([
    'top',
    'top-right',
    'bottom',
    'bottom-right',
    'left',
    'left-bottom',
    'right',
    'right-bottom',
  ]),
  /** Popover 'elevation' visually indicated with box-shadow */
  elevation: elementElevation,
};

const defaultProps = {
  className: '',
  onClose: () => {},
  children: null,
  side: 'left',
  elevation: 0,
};

const Popover = ({
  className,
  onClose,
  children,
  side,
  elevation,
  ...rest
}) => (
  <div
    className={classNames(
      'rc-popover',
      `rc-popover-${side}`,
      `rc-popover-elevation-${elevation}`,
      className,
    )}
    {...rest}
  >
    <Button
      className="rc-popover-close"
      icon="x"
      onClick={onClose}
      type="transparent"
    />
    {children}
  </div>
);

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

export default Popover;
