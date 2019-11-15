import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar } from '@puppet/react-components';
import routes from '../../routes/index';

const propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const AppSidebar = ({ t, location: { pathname } }) => (
  <Sidebar>
    <Sidebar.Header logo="my-project" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section label={t('sections.pages')}>
        {routes.map(({ title, path, icon = 'pdf' }) => (
          <Sidebar.Item
            key={title}
            title={title}
            icon={icon}
            active={pathname === path}
            as={Link}
            to={path}
          />
        ))}
      </Sidebar.Section>
      <Sidebar.Section label="Settings">
        <Sidebar.Item title="Admin" icon="gear" as={Link} to="/admin" />
        <Sidebar.Item
          title="Sign out"
          icon="sign-out"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert('Sign out');
          }}
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
