import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar } from '@puppet/react-components';

const propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const AppSidebar = ({ location: { pathname } }) => (
  <Sidebar>
    <Sidebar.Header logo="Design System" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section label="Authentication">
        <Sidebar.Item
          title="Confirmation"
          active={pathname === '/auth/confirmation'}
          as={Link}
          to="/auth/confirmation"
        />
        <Sidebar.Item
          title="Forgot Password"
          active={pathname === '/auth/forgot-password'}
          as={Link}
          to="/auth/forgot-password"
        />
        <Sidebar.Item
          title="Forgot Password Sent"
          active={pathname === '/auth/forgot-password-sent'}
          as={Link}
          to="/auth/forgot-password-sent"
        />
        <Sidebar.Item
          title="Login"
          active={pathname === '/auth/login'}
          as={Link}
          to="/auth/login"
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
