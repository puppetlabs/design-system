import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbSection from './BreadcrumbSection';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: undefined,
};

const Breadcrumb = ({ children }) => (
  <div className="rc-breadcrumb">{children}</div>
);

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
