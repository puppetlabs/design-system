import React from 'react';
import PropTypes from 'prop-types';
import { getHash } from 'rsg-components/../utils/handleHash';
import { Sidebar } from '@puppet/react-components';

const propTypes = {
  items: PropTypes.array.isRequired,
};
const contextTypes = {
  config: PropTypes.object.isRequired,
};

export function ComponentsListRenderer({ items: allItems }, { config }) {
  const { pagePerSection } = config;
  const items = allItems.filter(item => item.visibleName);

  if (!items.length) {
    return null;
  }

  // Match selected component in both basic routing and pagePerSection routing.
  const { hash, pathname } = window.location;
  const windowHash = pathname + (pagePerSection ? hash : getHash(hash));

  return items.map(({ visibleName, components, href, sections }) => {
    const isItemSelected = windowHash === href;

    if (components.length === 0 && sections.length === 0) {
      const renderedName =
        visibleName === 'Puppet Design System' ? 'Home' : visibleName;

      return (
        <Sidebar.Item
          active={isItemSelected}
          href={href}
          key={href}
          title={renderedName}
        />
      );
    }

    if (components.length > 0) {
      return (
        <Sidebar.Section key={href} label={visibleName}>
          {components.map(({ visibleName: componentName, name }) => {
            const componentHref = `${href}/${name}`;
            const isComponentSelected = windowHash === componentHref;
            return (
              <Sidebar.Item
                active={isComponentSelected}
                href={componentHref}
                key={name}
                title={componentName}
              />
            );
          })}
        </Sidebar.Section>
      );
    }

    if (sections.length > 0) {
      return (
        <Sidebar.Section key={href} label={visibleName}>
          {sections.map(({ visibleName: sectionName, name }) => {
            const sectionHref = `${href}/${name}`;
            const isComponentSelected = windowHash === sectionHref;
            return (
              <Sidebar.Item
                active={isComponentSelected}
                href={sectionHref}
                key={name}
                title={sectionName}
              />
            );
          })}
        </Sidebar.Section>
      );
    }
  });
}

ComponentsListRenderer.propTypes = propTypes;
ComponentsListRenderer.contextTypes = contextTypes;

export default ComponentsListRenderer;
