import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  /** Content to be rendered in wrapper */
  children: PropTypes.node,
  /** Optional additional className for outer wrapper */
  className: PropTypes.string,
  /** Optional additional inline styles for outer wrapper */
  style: PropTypes.shape({}),
};

const defaultProps = {
  children: null,
  className: '',
  style: {},
};

const Content = ({ className, children, ...rest }) => {
  const classNames = classnames('rc-content', className);

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
