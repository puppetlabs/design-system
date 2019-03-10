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
    <Sidebar.Header logo="insights" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section label="Authentication">
        <Sidebar.Item
          title="Login"
          icon="key"
          active={pathname === 'auth/login'}
          as={Link}
          to="/auth/login"
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
