import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Actions from './Actions';

const propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  border: false,
  children: null,
  className: '',
};

const Toolbar = ({ border, children, className }) => (
  <div
    className={classNames('rc-toolbar', className, {
      'rc-toolbar-border': border,
    })}
  >
    {children}
  </div>
);

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

Toolbar.Actions = Actions;

export default Toolbar;
