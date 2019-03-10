import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from '@puppet/react-components';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  className: '',
  children: null,
};

const AuthLayoutAction = ({ className, ...rest }) => (
  <Link className={classNames('rl-auth-layout-action', className)} {...rest} />
);

AuthLayoutAction.propTypes = propTypes;
AuthLayoutAction.defaultProps = defaultProps;

export default AuthLayoutAction;
