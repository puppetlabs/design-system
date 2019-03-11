import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Heading, Logo } from '@puppet/react-components';

import AuthLayoutAction from './AuthLayoutAction';

const propTypes = {
  title: PropTypes.string.isRequired,
  product: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  subtitle: '',
  className: '',
  children: null,
};

// TODO: we need to export these from react-components
const OFFICIAL_LOGOS = [
  'container-registry',
  'discovery',
  'enterprise',
  'insights',
  'pipelines',
];

const AuthLayout = ({
  product,
  title,
  subtitle,
  className,
  children,
  ...rest
}) => {
  const logoType = OFFICIAL_LOGOS.includes(product) ? 'full' : 'bug';

  return (
    <div className={classNames('rl-auth-layout', className)} {...rest}>
      <Logo
        type={logoType}
        className={classNames(
          'rl-auth-layout-logo',
          `rl-auth-layout-logo-${logoType}`,
        )}
        product={product}
      />
      <Card className="rl-auth-layout-content">
        <div className="rl-auth-layout-title">
          <Heading as="h5">{title}</Heading>
          <div className="rl-auth-layout-subtitle">{subtitle}</div>
        </div>
        {children}
      </Card>
    </div>
  );
};

AuthLayout.propTypes = propTypes;
AuthLayout.defaultProps = defaultProps;

AuthLayout.Action = AuthLayoutAction;

export default AuthLayout;
