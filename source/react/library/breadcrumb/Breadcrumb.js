import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbSection from './Section';
import BreadcrumbSeparator from './Separator';

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
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
