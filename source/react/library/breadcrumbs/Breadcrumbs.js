import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../link/Link';

const propTypes = {
  /**  Root path - Can either be a string or an object with path and alias keys */
  root: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      alias: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  /**  Array of routes to render after root path */
  routes: PropTypes.arrayOf(PropTypes.string),
  /**  Optional additional classes */
  className: PropTypes.string,
  /**  Optional additional inline styes */
  style: PropTypes.shape({}),
};

const defaultProps = {
  routes: [],
  className: '',
  style: null,
};

const Breadcrumbs = ({ root, routes, className, style }) => {
  let breadcrumb;
  let path;
  let alias;

  const rootPathIsObject = root && typeof root === 'object';
  if (rootPathIsObject) {
    ({ path, alias } = root);
  } else {
    path = root;
    alias = root;
  }

  if (path && alias) {
    breadcrumb = (
      <Link
        as={props => <span {...props} />}
        to={path}
        className="rc-breadcrumb-link"
        disabled={!routes.length}
        key={path}
      >
        {alias}
      </Link>
    );
  }

  if (!breadcrumb) {
    return null;
  }

  let currentPath = path;
  const crumbs = routes.map((parameter, index) => {
    currentPath = `${currentPath}/${parameter}`;

    const nextCrumb = (
      <Link
        as={props => <span {...props} />}
        to={currentPath}
        className="rc-breadcrumb-link"
        disabled={index === routes.length - 1}
        key={currentPath}
      >
        {parameter}
      </Link>
    );

    return nextCrumb;
  });

  crumbs.forEach(crumb => {
    const separator = (
      <span key={`${crumb}-separator`} className="rc-breadcrumb-separator">
        /
      </span>
    );

    breadcrumb = [breadcrumb, separator, crumb];
  });

  return (
    <div className={classnames('rc-breadcrumb', className)} style={style}>
      {breadcrumb}
    </div>
  );
};

Breadcrumbs.propTypes = propTypes;
Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
