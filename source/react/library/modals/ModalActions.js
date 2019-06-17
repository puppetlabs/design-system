import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  actionsPosition: PropTypes.oneOf(['left', 'right', 'block']),
};

const defaultProps = {
  className: '',
  actionsPosition: 'left',
};

/**
 * The card actions menu is just an actionsMenu with some defaults set
 */
const ModalActions = ({ className, actionsPosition, ...rest }) => (
  <div
    className={classNames(
      'rc-modal-actions',
      `rc-modal-actions-${actionsPosition}`,
      className,
    )}
    {...rest}
  />
);

ModalActions.propTypes = propTypes;
ModalActions.defaultProps = defaultProps;

export default ModalActions;
