import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbSection from './Section';
import BreadcrumbSeparator from './Separator';

const propTypes = {
  children: PropTypes.any,
};

const Breadcrumb = props => (
  <div className="rc-breadcrumb">{ props.children }</div>
);

Breadcrumb.propTypes = propTypes;

Breadcrumb.Section = BreadcrumbSection;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
