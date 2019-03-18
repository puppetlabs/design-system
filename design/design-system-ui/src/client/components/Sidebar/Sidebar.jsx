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
          active={pathname === '/'}
          as={Link}
          to="/"
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.styleguide')}>
        <Sidebar.Item title={t('pages.colors')} icon="brush" />
        <Sidebar.Item title={t('pages.typography')} icon="text" />
        <Sidebar.Item title={t('pages.icons')} icon="image" />
        <Sidebar.Item title={t('pages.alignments')} icon="grid" />
        <Sidebar.Item title={t('pages.containers')} icon="duplicate" />
        <Sidebar.Item title={t('pages.components')} icon="package" />
        <Sidebar.Item title={t('pages.buttons')} icon="engagament" />
        <Sidebar.Item title={t('pages.formComponents')} icon="paper" />
        <Sidebar.Item title={t('pages.dialogs')} icon="annotate" />
        <Sidebar.Item title={t('pages.uncategorized')} icon="tag" />
        <Sidebar.Item title={t('pages.justInCase')} icon="plus-circle" />
        <Sidebar.Item title={t('pages.navigation')} icon="structure" />
        <Sidebar.Item title={t('pages.formLayouts')} icon="paper" />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.api')}>
        <Sidebar.Item title={t('pages.reactComponents')} icon="code" />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.writing')}>
        <Sidebar.Item title={t('pages.guiTextGuidelines')} icon="book" />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Design System" version="1.0" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;
