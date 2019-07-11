import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar } from '@puppet/react-components';

const propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const AppSidebar = ({ t, location: { pathname } }) => (
  <Sidebar>
    <Sidebar.Header logo="Design System" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section label={t('sections.overview')}>
        <Sidebar.Item
          title={t('pages.home')}
          icon="home"
          as={Link}
          to="/"
          active={pathname === '/'}
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.foundations')}>
        <Sidebar.Item
          title={t('pages.colors')}
          icon="brush"
          as={Link}
          to="/colors"
          active={pathname === '/colors'}
        />
        <Sidebar.Item
          title={t('pages.typography')}
          icon="text"
          as={Link}
          to="/typography"
          active={pathname === '/typography'}
        />
        <Sidebar.Item
          title={t('pages.icons')}
          icon="image"
          as={Link}
          to="/icons"
          active={pathname === '/icons'}
        />
        <Sidebar.Item
          title={t('pages.alignments')}
          icon="hamburger"
          as={Link}
          to="/alignments"
          active={pathname === '/alignments'}
        />
        <Sidebar.Item
          title={t('pages.containers')}
          icon="package"
          as={Link}
          to="/containers"
          active={pathname === '/containers'}
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.components')}>
        <Sidebar.Item
          title={t('pages.buttons')}
          icon="engagement"
          as={Link}
          to="/buttons"
          active={pathname === '/buttons'}
        />
        <Sidebar.Item
          title={t('pages.formComponents')}
          icon="paper"
          as={Link}
          to="forms"
          active={pathname === '/forms'}
        />
        <Sidebar.Item
          title={t('pages.dialogs')}
          icon="annotate"
          as={Link}
          to="/dialogs"
          active={pathname === '/dialogs'}
        />
        <Sidebar.Item
          title={t('pages.tables')}
          icon="grid"
          as={Link}
          to="/tables"
          active={pathname === '/tables'}
        />
        <Sidebar.Item
          title={t('pages.subnavigation')}
          icon="structure"
          as={Link}
          to="/subnavigation"
          active={pathname === '/subnavigation'}
        />
        <Sidebar.Item
          title={t('pages.uncategorized')}
          icon="tag"
          as={Link}
          to="/uncategorized"
          active={pathname === '/uncategorized'}
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.patterns')}>
        <Sidebar.Item
          title={t('pages.navigation')}
          icon="structure"
          as={Link}
          to="/navigation"
          active={pathname === '/navigation'}
        />
        <Sidebar.Item
          title={t('pages.formPatterns')}
          icon="paper"
          as={Link}
          to="/form-patterns"
          active={pathname === '/form-patterns'}
        />
        <Sidebar.Item
          title={t('pages.modalLayouts')}
          icon="duplicate"
          as={Link}
          to="/modal-layouts"
          active={pathname === '/modal-layouts'}
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.api')}>
        <Sidebar.Item
          title={t('pages.reactComponents')}
          icon="code"
          as={Link}
          to="/react-components"
          active={pathname === '/react-components'}
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Design System" version="5.0.0-beta" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
