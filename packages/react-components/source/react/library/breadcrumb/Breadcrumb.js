import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BreadcrumbSection from './BreadcrumbSection';

const propTypes = {
  /** The BreadcrumbSections to render */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional additional inline styles */
  style: PropTypes.shape({}),
};

const defaultProps = {
  children: undefined,
  className: '',
  style: {},
};

const Breadcrumb = ({ children, className, ...props }) => {
  let crumbs = React.Children.toArray(children);

  crumbs = crumbs.map((crumb, index) => {
    const active = index === crumbs.length - 1;

    return React.cloneElement(crumb, { active });
  });

  return (
    <div className={classNames('rc-breadcrumb', className)} {...props}>
      {crumbs}
    </div>
  );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
