import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

const defaultProps = {
  className: '',
  children: null,
};

/**
 * `Content` is a container component for rendering other React components.
 */

const Content = ({ className, children }) => {
  const classNames = classnames('rc-content', className);

  return <div className={classNames}>{children}</div>;
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
