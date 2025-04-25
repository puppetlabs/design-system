import React from 'react';
import PropTypes from 'prop-types';
import Ribbon from 'rsg-components/Ribbon';
import { Sidebar } from '@puppet/react-components';
import './StyleGuideRenderer.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};
const defaultProps = {
  hasSidebar: true,
};

export function StyleGuideRenderer({ children, toc, hasSidebar }) {
  return (
    <div className="app">
      {hasSidebar && (
        <Sidebar>
          <Sidebar.Header
            logo="puppet-general-new"
            ariaLabel="Return to the home page"
            as="a"
            href="/"
          />
          {toc}
        </Sidebar>
      )}
      <main className="app-main-content">
        {children}
        <Ribbon />
      </main>
    </div>
  );
}

StyleGuideRenderer.propTypes = propTypes;
StyleGuideRenderer.defaultProps = defaultProps;

export default StyleGuideRenderer;
