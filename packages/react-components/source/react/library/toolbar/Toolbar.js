import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Actions from './Actions';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  children: null,
  className: '',
};

const Toolbar = ({ children, className }) => (
  <div className={`rc-toolbar ${className}`}>{children}</div>
);

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

Toolbar.Actions = Actions;

export default Toolbar;
