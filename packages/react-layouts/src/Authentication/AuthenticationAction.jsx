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

const AuthenticationAction = ({ className, ...rest }) => (
  <Link
    className={classNames('rl-authentication-action', className)}
    {...rest}
  />
);

AuthenticationAction.propTypes = propTypes;
AuthenticationAction.defaultProps = defaultProps;

export default AuthenticationAction;
