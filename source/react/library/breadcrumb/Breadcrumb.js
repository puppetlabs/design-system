import React from 'react';
import PropTypes from 'prop-types';
import BreadcrumbSection from './BreadcrumbSection';
import BreadcrumbSeparator from './BreadcrumbSeparator';

const propTypes = {
  children: PropTypes.any,
};

class Breadcrumb extends React.Component {
  render() {
    const { children } = this.props;

    return <div className="rc-breadcrumb">{ children }</div>;
  }
}

Breadcrumb.propTypes = propTypes;

Breadcrumb.Section = BreadcrumbSection;
Breadcrumb.Separator = BreadcrumbSeparator;

export default Breadcrumb;
