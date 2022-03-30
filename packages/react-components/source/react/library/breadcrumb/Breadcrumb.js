import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BreadcrumbSection from './BreadcrumbSection';
import Hyperlink from '../link';
import Icon from '../icon';

const propTypes = {
  /** The BreadcrumbSections to render */
  children: PropTypes.node,
  /** Optional additional classnames */
  className: PropTypes.string,
  /** Optional additional inline styles */
  style: PropTypes.shape({}),
  /** Main visual variant */
  type: PropTypes.oneOf(['standard', 'back']),
  /** Text rendered when type equals back */
  backLabel: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  className: '',
  style: {},
  type: 'standard',
  backLabel: 'Back',
};

const Breadcrumb = ({ children, className, type, backLabel, ...props }) => {
  let crumbs = React.Children.toArray(children);

  crumbs = crumbs.map((crumb, index) => {
    const active = index === crumbs.length - 1;

    return React.cloneElement(crumb, { active });
  });

  return (
    <>
      {type === 'standard' ? (
        <nav
          aria-label="Breadcrumb"
          className={classNames('rc-breadcrumb', className)}
          {...props}
        >
          <ol>{crumbs}</ol>
        </nav>
      ) : (
        <div
          className={classNames('rc-breadcrumb', className)}
          aria-label="Breadcrumb"
        >
          <Icon type="chevron-left" aria-hidden="true" />
          <Hyperlink
            className="rc-breadcrumb-section"
            color="medium"
            size="tiny"
            tabIndex="0"
            {...props}
          >
            {backLabel}
          </Hyperlink>
        </div>
      )}
    </>
  );
};

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

Breadcrumb.Section = BreadcrumbSection;

export default Breadcrumb;
