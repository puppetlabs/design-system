import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Card, Heading, Logo } from '@puppet/react-components';
import PageContent from '../PageContent';

import AuthenticationAction from './AuthenticationAction';

const propTypes = {
  /** Authentication page title, for example "Login to My Product" */
  title: PropTypes.string.isRequired,
  /** Authentication page subtitle, rendered below title. Intended for help relevant to the confirmation page */
  subtitle: PropTypes.string,
  /** Product logo. One of the official set or a custom string */
  product: PropTypes.oneOfType([
    PropTypes.oneOf(Logo.SUPPORTED_LOGOS),
    PropTypes.string,
  ]).isRequired,
  /** Optional additional className */
  className: PropTypes.string,
  /** Content, rendered inside a centered card */
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
    <PageContent
      type="secondary"
      className={className}
      innerClassName="rl-authentication"
      {...rest}
    >
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
          <Heading as="h3">{title}</Heading>
          <div className="rl-authentication-subtitle">{subtitle}</div>
        </div>
        {children}
      </Card>
    </PageContent>
  );
};

Authentication.propTypes = propTypes;
Authentication.defaultProps = defaultProps;

Authentication.Action = AuthenticationAction;

export default Authentication;
