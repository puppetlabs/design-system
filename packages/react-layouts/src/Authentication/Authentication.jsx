import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Heading, Logo } from '@puppet/react-components';

import AuthenticationAction from './AuthenticationAction';

const propTypes = {
  title: PropTypes.string.isRequired,
  product: PropTypes.oneOf(Logo.SUPPORTED_LOGOS).isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  subtitle: '',
  className: '',
  children: null,
};

const Authentication = ({
  product,
  title,
  subtitle,
  className,
  children,
  ...rest
}) => {
  const logoType = Logo.SUPPORTED_LOGOS.includes(product) ? 'full' : 'bug';

  return (
    <div className={classNames('rl-authentication', className)} {...rest}>
      <Logo
        type={logoType}
        className={classNames(
          'rl-authentication-logo',
          `rl-authentication-logo-${logoType}`,
        )}
        product={product}
      />
      <Card className="rl-authentication-content">
        <div className="rl-authentication-title">
          <Heading as="h5">{title}</Heading>
          <div className="rl-authentication-subtitle">{subtitle}</div>
        </div>
        {children}
      </Card>
    </div>
  );
};

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;

Authentication.Action = AuthenticationAction;

export default Authentication;
