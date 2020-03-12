import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  align: PropTypes.oneOf('left', 'right'),
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  align: 'left',
  children: null,
  className: '',
};

const Actions = ({ align, children, className }) => (
  <div
    className={classNames(
      'rc-toolbar-actions',
      `rc-toolbar-actions-${align}`,
      className,
    )}
  >
    {children}
  </div>
);

Actions.propTypes = propTypes;
Actions.defaultProps = defaultProps;

export default Actions;
