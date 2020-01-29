import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  /** React component / element to render. Useful in cases where a button is used for navigation, so that it can be rendered as an anchor tag with the same styling */
  as: PropTypes.elementType,
  /** Content to be rendered in wrapper */
  children: PropTypes.node,
  /** Optional additional className for outer wrapper */
  className: PropTypes.string,
  /** Optional additional inline styles for outer wrapper */
  style: PropTypes.shape({}),
};

const defaultProps = {
  as: 'div',
  children: null,
  className: '',
  style: {},
};

const Content = ({ as: Element, className, children, ...rest }) => {
  const classNames = classnames('rc-content', className);

  return (
    <Element className={classNames} {...rest}>
      {children}
    </Element>
  );
};

Content.propTypes = propTypes;
Content.defaultProps = defaultProps;

export default Content;
